import { injectable } from 'inversify';
import { Engine } from 'php-parser';
import { LineOfCodeCountableNode as LineOfCodeCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { type ASTNode as PHP_ASTNode } from './ASTNode'; // Renamed to avoid confusion if ASTNode from interface is different
import { ASTKind } from './ASTKind';

// Define the set of AST kinds that represent statements
const STATEMENT_KINDS = new Set<ASTKind>([
  ASTKind.CLASS, ASTKind.TRAIT, ASTKind.INTERFACE, ASTKind.FUNCTION, ASTKind.CLOSURE, ASTKind.ARROW_FUNCTION,
  ASTKind.ASSIGN, ASTKind.IF, ASTKind.SWITCH, ASTKind.WHILE, ASTKind.DO,
  ASTKind.RETURN_IF, ASTKind.HALT, ASTKind.CASE, ASTKind.CLONE, ASTKind.CONTINUE, ASTKind.DECLARE,
  ASTKind.EXIT, ASTKind.EMPTY, ASTKind.EVAL, ASTKind.GLOBAL, ASTKind.INCLUDE, ASTKind.ISSET,
  ASTKind.LIST, ASTKind.NAMESPACE, ASTKind.NEW, ASTKind.RETURN, ASTKind.STATIC, ASTKind.THROW,
  ASTKind.UNSET, ASTKind.USE, ASTKind.YIELD, ASTKind.YIELD_FROM,
  // According to php-parser documentation, 'exprstmt' is a kind for expression statements.
  // This isn't in the provided ASTKind.ts, so we'll rely on things like ASTKind.ASSIGN, calls, etc.
  // If there's a generic "ExpressionStatement" kind, it should be added.
  // For now, specific expression-like kinds that function as statements are included.
]);

// Define AST kinds that are expressions and should be counted if they are part of for-loop structures
const FOR_LOOP_EXPRESSION_KINDS = new Set<ASTKind>([
    ASTKind.ASSIGN, ASTKind.BIN, // Binary operations like comparison, increment/decrement if not specific kinds
    ASTKind.VARIABLE, // Simple variable usage if it stands alone as an expression
    ASTKind.NEW, // e.g. new Foo()
    // Calls are typically wrapped in 'call' kind in php-parser, not present in current ASTKind.ts
    // Add specific kinds for ++, --, etc. if they exist (e.g., PreInc, PostInc)
]);


@injectable()
export class LineOfCodeCountableNode implements LineOfCodeCountableNodeInterface {
  constructor(private readonly node: PHP_ASTNode) {}

  getText() {
    return this.node.source;
  }

  getRemovedCommentAndEmptyLineText() {
    const engine = new Engine({
      parser: {
        extractDoc: true,
      },
      lexer: {
        all_tokens: true,
      },
    });
    const source = this.node.commentStripSource.replace(/\n?/g, '\n');
    // https://github.com/glayzzle/php-parser/pull/737
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokens: Array<string | string[]> = <any>engine.tokenGetAll(`<?php ${source}`);

    const removeTargetLineNumbers = tokens
      .filter((row) => row[0] === 'T_WHITESPACE')
      .flatMap((row) =>
        [...Array((String(row[1]).match(/\n/g) ?? []).length).keys()]
          .map((index) => index + (Number(row[2]) - 1))
          .slice(1)
      );

    return removeTargetLineNumbers
      .reduce((sourcePerNewLine, removeIndexNumber) => {
        sourcePerNewLine[removeIndexNumber] = null;
        return sourcePerNewLine;
      }, <Array<string | null>>source.split('\n'))
      .filter((row) => row !== null)
      .join('\n');
  }

  countStatements(): number {
    let count = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countRecursive = (currentNode: PHP_ASTNode | any) => {
      if (!currentNode || !currentNode.kind) {
        return;
      }

      if (currentNode.kind === ASTKind.FOR) {
        // Special handling for 'for' loops based on ProjectCodeMeter example
        // Count expressions in init, cond, and loop parts
        // Assuming 'init', 'cond', 'loop' are properties on the FOR node containing arrays of expressions
        const forNode = currentNode as any; // Adjust type if specific ForNode type is available
        if (forNode.init) {
            forNode.init.forEach((expr: any) => countRecursive(expr));
        }
        if (forNode.cond) {
            forNode.cond.forEach((expr: any) => countRecursive(expr));
        }
        if (forNode.loop) {
            forNode.loop.forEach((expr: any) => countRecursive(expr));
        }
        // Do not count the FOR node itself, only its constituent expressions that act as statements.
        // Then, recurse into the body of the for loop.
        if (forNode.body && typeof forNode.body === 'object') {
             countRecursive(forNode.body);
        }
        return; // Stop further processing for the FOR node itself
      }

      if (STATEMENT_KINDS.has(currentNode.kind as ASTKind)) {
        count++;
      } else if (FOR_LOOP_EXPRESSION_KINDS.has(currentNode.kind as ASTKind)) {
        // This case is primarily for expressions within FOR loops that are already handled.
        // If an expression kind can also be a standalone statement and isn't in STATEMENT_KINDS,
        // it might need to be added there or handled by a generic ExpressionStatement wrapper.
        // For now, we assume FOR_LOOP_EXPRESSION_KINDS are counted when they are part of FOR.
        // If they can be standalone statements, they should be in STATEMENT_KINDS.
        // Example: if `ASTKind.BIN` (like i < 5) is only ever inside `for`, this is fine.
        // If `i < 5;` could be a statement on its own, it needs to be in `STATEMENT_KINDS`.
        // The php-parser usually wraps standalone expressions in an "ExpressionStatement" node.
        // The provided ASTKind.ts does not have "ExpressionStatement".
        // We assume that kinds like ASSIGN, NEW, etc., when standalone, are correctly captured by STATEMENT_KINDS.
      }


      // Generic traversal for children.
      // This needs to be adapted to how children are actually structured in PHP_ASTNode.
      // The existing `getChildren()` method in `PHP_ASTNode` might be useful here,
      // or direct traversal of known properties that hold children.
      if (typeof currentNode === 'object' && currentNode !== null) {
        for (const key in currentNode) {
          if (Object.prototype.hasOwnProperty.call(currentNode, key)) {
            const child = currentNode[key];
            if (Array.isArray(child)) {
              child.forEach(innerChild => countRecursive(innerChild));
            } else if (typeof child === 'object' && child !== null && child.kind) {
              // Only recurse if child looks like an AST node
              // Avoid recursing into 'loc', 'leadingComments' etc.
              if (key !== 'loc' && key !== 'attributes' && key !== 'leadingComments' && key !== 'trailingComments') {
                 // If we are not counting the current node (e.g. it's a Program or Block),
                 // we still need to recurse into its children.
                 // If we *are* counting the current node (e.g. IfStatement), we also need to recurse for nested statements.
                 if (currentNode.kind === ASTKind.PROGRAM || currentNode.kind === 'block' || STATEMENT_KINDS.has(currentNode.kind as ASTKind)) {
                    countRecursive(child);
                 }
              }
            }
          }
        }
      }
    };

    countRecursive(this.node);
    return count;
  }
}
