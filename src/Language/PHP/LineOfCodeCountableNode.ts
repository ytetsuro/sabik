import { injectable } from 'inversify';
import { Engine } from 'php-parser';
import { LineOfCodeCountableNode as LineOfCodeCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { type ASTNode as PHP_ASTNode_Wrapper } from './ASTNode'; // Wrapper
import { ASTKind } from './ASTKind'; // Enum of kinds

// Define the set of AST kinds that represent statements
const STATEMENT_KINDS = new Set<ASTKind | string>([ // Allow string for direct php-parser kinds
  ASTKind.CLASS, ASTKind.TRAIT, ASTKind.INTERFACE, ASTKind.FUNCTION, ASTKind.CLOSURE, ASTKind.ARROW_FUNCTION,
  ASTKind.ASSIGN, ASTKind.IF, ASTKind.SWITCH, ASTKind.WHILE, ASTKind.DO, ASTKind.FOREACH, // Added FOREACH
  ASTKind.RETURN_IF, ASTKind.HALT, ASTKind.CASE, ASTKind.CLONE, ASTKind.CONTINUE, ASTKind.DECLARE,
  ASTKind.EXIT, ASTKind.EMPTY, ASTKind.EVAL, ASTKind.GLOBAL, ASTKind.INCLUDE, ASTKind.ISSET,
  ASTKind.LIST, ASTKind.NAMESPACE, ASTKind.NEW, ASTKind.RETURN, ASTKind.STATIC, ASTKind.THROW,
  ASTKind.UNSET, ASTKind.USE, ASTKind.YIELD, ASTKind.YIELD_FROM,
  ASTKind.TRY, ASTKind.CATCH, ASTKind.FINALLY, // Added TRY, CATCH, FINALLY
  'exprstmt', // From php-parser for expression statements
  // ASTKind.BLOCK is not here, handled by _handleBlock
]);

// Define AST kinds that are expressions and should be counted if they are part of for-loop structures
const FOR_LOOP_EXPRESSION_KINDS = new Set<ASTKind | string>([
    ASTKind.ASSIGN, ASTKind.BIN, 
    ASTKind.VARIABLE, 
    ASTKind.NEW,
    'preinc', 'postinc', 'predec', 'postdec', // Common inc/dec operations
    'call', // Function/method calls
]);


@injectable()
export class LineOfCodeCountableNode implements LineOfCodeCountableNodeInterface {
  private statementCount = 0;
  // The node passed to the constructor is our wrapper.
  // We'll mostly work with the raw php-parser node it contains.
  private readonly rawRootNode: any; 

  constructor(private readonly wrapperNode: PHP_ASTNode_Wrapper) {
    this.rawRootNode = wrapperNode.node; // Assuming 'node' property holds the actual php-parser node
  }

  getText() {
    // Assuming the wrapperNode's source is the full text of the node it wraps.
    return this.wrapperNode.source;
  }

  getRemovedCommentAndEmptyLineText() {
    const engine = new Engine({ /* ... parser options ... */ });
    const source = this.wrapperNode.commentStripSource.replace(/\n?/g, '\n');
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

  public countStatements(): number {
    this.statementCount = 0;
    this._traverseAndCount(this.rawRootNode, 0); 
    return this.statementCount;
  }

  private _traverseAndCount(currentNode: any, currentDepth: number): void {
    if (!currentNode || !currentNode.kind) {
      return;
    }

    switch (currentNode.kind as ASTKind | string) {
      case ASTKind.PROGRAM:
      case 'block':
        this._handleBlock(currentNode, currentDepth);
        return;
      case ASTKind.IF:
        this._handleIf(currentNode, currentDepth);
        return;
      case ASTKind.FOR:
        this._handleFor(currentNode, currentDepth);
        return;
      case ASTKind.WHILE:
        this._handleWhile(currentNode, currentDepth);
        return;
      case ASTKind.DO:
        this._handleDo(currentNode, currentDepth);
        return;
      case ASTKind.FOREACH: // Assuming ASTKind.FOREACH exists or 'foreach' string kind
        this._handleForeach(currentNode, currentDepth);
        return;
      case ASTKind.SWITCH:
        this._handleSwitch(currentNode, currentDepth);
        return;
      case ASTKind.TRY:
        this._handleTry(currentNode, currentDepth);
        return;
      // No default case, fall through to generic statement counting and child traversal
    }

    if (this._isCountableStatement(currentNode, currentDepth)) {
      this.statementCount++;
    }

    // Default traversal for children if not handled by specific methods above.
    const children = this._getNodeChildren(currentNode);
    children.forEach(child => {
      // This default traversal assumes children are at the same depth unless they form blocks.
      // Specific handlers should manage depth more precisely.
      // For example, if 'ifNode.body' is not a block, it should be currentDepth + 1.
      // The current _handleIf, _handleFor etc. try to do this.
      // This generic child traversal might be too simplistic for nodes not covered by specific handlers.
      // It's better if specific handlers fully manage their children's traversal.
      // For now, let's assume specific handlers will stop recursion if they manage it.
      // This path is for nodes not covered by switch-case, or for children of nodes that don't have dedicated handling for all their child properties.
      this._traverseAndCount(child, currentDepth); 
    });
  }

  private _getNodeChildren(rawNode: any): any[] {
    if (!rawNode || typeof rawNode !== 'object') return [];
    const children: any[] = [];
    // More comprehensive list of properties that can hold child nodes or arrays of child nodes
    const childProperties = [
        'children', 'body', 'stmts', 'expr', 'left', 'right', 'what', 
        'init', 'cond', 'loop', 'cases', 'catches', 'finally', 'alternate',
        'trueExpr', 'falseExpr', // for ternary
        'key', 'value', 'source', // for foreach
        'arguments', 'args', // for calls, new
        'items', // for array
        'expressions', // for list, print, echo
        'vars', // for global, static
        'declarations', // for declare
        'catches', // for try
        'usegroups', 'uses', // for use
        'extends', 'implements', // for class
        'params', 'returnType', // for function
        'name', // for class, function, const, etc. (if it's an AST node itself)
        'expr', // for exprstmt, return, throw, etc.
        'left', 'right', // for assign, bin, etc.
        'what', // for clone, include, etc.
        'obj', // for propertylookup, methodlookup
        'offset', // for offsetlookup
        'test', 'consequent', 'alternate' // for if (though 'body' and 'alternate' are more common)
    ];

    for (const prop of childProperties) {
        const value = rawNode[prop];
        if (value) {
            if (Array.isArray(value)) {
                children.push(...value.filter(item => item && typeof item.kind === 'string'));
            } else if (typeof value === 'object' && typeof value.kind === 'string') {
                children.push(value);
            }
        }
    }
    // Remove duplicates that might arise if a node is listed in multiple properties (unlikely but safe)
    return Array.from(new Set(children));
  }

  private _isCountableStatement(node: any, currentStatementDepth: number): boolean {
    if (currentStatementDepth > 2) {
      return false;
    }
    if (node.kind === 'block' || node.kind === ASTKind.PROGRAM) {
      return false;
    }
    return STATEMENT_KINDS.has(node.kind as ASTKind | string);
  }

  private _handleBlock(blockNode: any, currentBlockDepth: number): void {
    // 'children' for Program and Block, 'body' for Namespace, 'stmts' for Case/Declare
    const statements = blockNode.children || blockNode.body?.children || blockNode.body?.stmts || blockNode.stmts || [];
    const statementsDepth = (blockNode.kind === ASTKind.PROGRAM) ? currentBlockDepth : currentBlockDepth + 1;
    statements.forEach((statement: any) => {
      this._traverseAndCount(statement, statementsDepth);
    });
  }

  private _handleIf(ifNode: any, currentContextDepth: number): void {
    if (this._isCountableStatement(ifNode, currentContextDepth)) {
      this.statementCount++;
    }
    const bodyDepth = currentContextDepth + 1;
    if (ifNode.body) {
      if (ifNode.body.kind === 'block') {
        this._handleBlock(ifNode.body, currentContextDepth); // _handleBlock uses currentContextDepth, children at +1
      } else {
        this._traverseAndCount(ifNode.body, bodyDepth);
      }
    }
    if (ifNode.alternate) {
      if (ifNode.alternate.kind === 'block') {
        this._handleBlock(ifNode.alternate, currentContextDepth);
      } else if (ifNode.alternate.kind === ASTKind.IF || ifNode.alternate.kind === 'if') { // Elseif
        this._handleIf(ifNode.alternate, currentContextDepth); // Elseif is at the same depth
      } else {
        this._traverseAndCount(ifNode.alternate, bodyDepth);
      }
    }
  }

  private _handleFor(forNode: any, currentContextDepth: number): void {
    const depthForParts = currentContextDepth + 1;
    if (depthForParts <= 2) {
      if (forNode.init) forNode.init.forEach((expr: any) => {
        if (STATEMENT_KINDS.has(expr.kind) || FOR_LOOP_EXPRESSION_KINDS.has(expr.kind)) this.statementCount++;
      });
      if (forNode.cond) forNode.cond.forEach((expr: any) => {
        if (STATEMENT_KINDS.has(expr.kind) || FOR_LOOP_EXPRESSION_KINDS.has(expr.kind)) this.statementCount++;
      });
      if (forNode.loop) forNode.loop.forEach((expr: any) => {
        if (STATEMENT_KINDS.has(expr.kind) || FOR_LOOP_EXPRESSION_KINDS.has(expr.kind)) this.statementCount++;
      });
    }
    if (forNode.body) {
      if (forNode.body.kind === 'block') {
        this._handleBlock(forNode.body, currentContextDepth);
      } else {
        this._traverseAndCount(forNode.body, currentContextDepth + 1);
      }
    }
  }

  private _handleWhile(whileNode: any, currentContextDepth: number): void {
    if (this._isCountableStatement(whileNode, currentContextDepth)) {
      this.statementCount++;
    }
    // Condition is part of the while, not a separate statement for LLOC usually.
    if (whileNode.body) {
      if (whileNode.body.kind === 'block') {
        this._handleBlock(whileNode.body, currentContextDepth);
      } else {
        this._traverseAndCount(whileNode.body, currentContextDepth + 1);
      }
    }
  }

  private _handleDo(doNode: any, currentContextDepth: number): void {
    if (this._isCountableStatement(doNode, currentContextDepth)) {
      this.statementCount++;
    }
    // Condition is part of the do-while, not a separate statement for LLOC usually.
    if (doNode.body) {
      if (doNode.body.kind === 'block') {
        this._handleBlock(doNode.body, currentContextDepth);
      } else {
        this._traverseAndCount(doNode.body, currentContextDepth + 1);
      }
    }
  }

  private _handleForeach(foreachNode: any, currentContextDepth: number): void {
    if (this._isCountableStatement(foreachNode, currentContextDepth)) {
      this.statementCount++;
    }
    // source, key, value are part of the foreach structure.
    if (foreachNode.body) {
      if (foreachNode.body.kind === 'block') {
        this._handleBlock(foreachNode.body, currentContextDepth);
      } else {
        this._traverseAndCount(foreachNode.body, currentContextDepth + 1);
      }
    }
  }

  private _handleSwitch(switchNode: any, currentContextDepth: number): void {
    if (this._isCountableStatement(switchNode, currentContextDepth)) {
      this.statementCount++;
    }
    const caseDepth = currentContextDepth + 1;
    if (switchNode.body && switchNode.body.kind === 'block' && switchNode.body.children) { // Switch body is a block containing cases
        switchNode.body.children.forEach((caseNode: any) => { // caseNode is a 'case' or 'default'
            if (this._isCountableStatement(caseNode, caseDepth)) {
                this.statementCount++;
            }
            if (caseNode.body && caseNode.body.children) { // Body of the case
                caseNode.body.children.forEach((stmt: any) => this._traverseAndCount(stmt, caseDepth));
            } else if (caseNode.body && caseNode.body.kind !== 'block') { // Single statement in case, no block
                 this._traverseAndCount(caseNode.body, caseDepth);
            }
        });
    }
  }

  private _handleTry(tryNode: any, currentContextDepth: number): void {
    if (this._isCountableStatement(tryNode, currentContextDepth)) {
      this.statementCount++;
    }
    const blockContentDepth = currentContextDepth + 1; // Depth for statements *inside* try/catch/finally blocks

    if (tryNode.body) { // This is the try block
        this._handleBlock(tryNode.body, currentContextDepth); // Pass currentContextDepth, _handleBlock will use +1 for children
    }
    if (tryNode.catches) {
      tryNode.catches.forEach((catchNode: any) => {
        if (this._isCountableStatement(catchNode, blockContentDepth > 2 ? 99 : blockContentDepth)) { // Catch itself counts
          this.statementCount++;
        }
        if (catchNode.body) {
          this._handleBlock(catchNode.body, currentContextDepth); // Children of catch block
        }
      });
    }
    if (tryNode.finally) { // This is a block
        // The 'finally' keyword itself isn't a statement kind in STATEMENT_KINDS.
        // We count the statements within its block.
        this._handleBlock(tryNode.finally, currentContextDepth);
    }
  }
}
