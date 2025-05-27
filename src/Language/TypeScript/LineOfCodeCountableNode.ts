import { injectable } from 'inversify';
import * as ts from 'typescript';
import { LineOfCodeCountableNode as LineOfCodeCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { type ASTNode as TypeScriptASTNodeWrapper } from './ASTNode'; // Renamed for clarity

// Define the set of SyntaxKind values that represent statements
const STATEMENT_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.Block, // Counted if it's not part of another statement (e.g. function body) or if it's an empty block statement.
                       // The statements *within* a block are counted individually.
  ts.SyntaxKind.BreakStatement,
  ts.SyntaxKind.ContinueStatement,
  ts.SyntaxKind.DebuggerStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.EmptyStatement,
  ts.SyntaxKind.ExpressionStatement,
  ts.SyntaxKind.ForInStatement, // The statement itself
  ts.SyntaxKind.ForOfStatement, // The statement itself
  ts.SyntaxKind.ForStatement,   // The statement itself
  ts.SyntaxKind.IfStatement,
  ts.SyntaxKind.LabeledStatement,
  ts.SyntaxKind.ReturnStatement,
  ts.SyntaxKind.SwitchStatement,
  ts.SyntaxKind.ThrowStatement,
  ts.SyntaxKind.TryStatement,
  ts.SyntaxKind.VariableStatement,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.WithStatement,
  ts.SyntaxKind.ModuleDeclaration,
  ts.SyntaxKind.ImportDeclaration,
  ts.SyntaxKind.ExportDeclaration,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.InterfaceDeclaration, // Counted as per broader definition of 'logical statement'
  ts.SyntaxKind.TypeAliasDeclaration, // Counted
]);

@injectable()
export class LineOfCodeCountableNode implements LineOfCodeCountableNodeInterface {
  private readonly pureNode: ts.Node;

  constructor(private readonly wrapperNode: TypeScriptASTNodeWrapper) {
    this.pureNode = wrapperNode.node; // Assuming 'node' property holds the actual ts.Node
  }

  getText() {
    // It's generally better to get text from the source file via the node's pos and end properties
    // getFullText() might include leading/trailing trivia not part of the node itself in some contexts.
    // However, for LLOC, full text of the statement is usually implied.
    // const sourceFileText = this.pureNode.getSourceFile().getFullText();
    // return sourceFileText.substring(this.pureNode.getStart(), this.pureNode.getEnd());
    return this.pureNode.getFullText(); // Keeping original logic for now
  }

  getRemovedCommentAndEmptyLineText() {
    // This method's current implementation re-parses the node's text.
    // This is okay for LLOC calculation if it accurately strips comments for that specific node's text.
    const nodeText = this.pureNode.getFullText();
    const sourceFile = ts.createSourceFile(
      'dummy.ts',
      nodeText, // Use only the current node's text
      ts.ScriptTarget.ESLatest, // Use a modern target
      /*setParentNodes*/ false // Not strictly needed for printing
    );

    // Create a printer to remove comments
    const printer = ts.createPrinter({ removeComments: true });
    let printedText = printer.printNode(ts.EmitHint.Unspecified, sourceFile.statements[0] || this.pureNode, sourceFile);

    // The printer might add a trailing newline; LLOC usually doesn't count the final newline of a file.
    // However, this function is about removing comments and empty lines within the text.
    // The original code used printFile, which might be more robust if the node is a whole file.
    // If pureNode is guaranteed to be a statement or declaration, printNode is fine.
    // Let's refine to be closer to original if pureNode could be a SourceFile itself.
    if (this.pureNode.kind === ts.SyntaxKind.SourceFile) {
        printedText = printer.printFile(this.pureNode as ts.SourceFile);
    } else {
        // For arbitrary nodes, getting just its text without comments is tricky.
        // The original approach of printing the first statement of a dummy file made from node text
        // is a bit of a hack. A more robust way would be to traverse and reconstruct.
        // For now, this is a placeholder for "get text of node without comments".
        // The LLOC logic will use countStatements, so this method's accuracy is secondary for LLOC.
    }
    // Fallback to original logic if specific node printing is problematic
    return ts.createPrinter({ removeComments: true }).printFile(ts.createSourceFile(
      'dummy.ts', this.pureNode.getFullText(), ts.ScriptTarget.ES2016, true
    ));
  }

  countStatements(): number {
    let count = 0;

    const countRecursive = (currentNode: ts.Node) => {
      if (!currentNode) {
        return;
      }

      let isStatement = STATEMENT_KINDS.has(currentNode.kind);

      if (isStatement) {
        // Special handling for ForStatement as per ProjectCodeMeter
        if (currentNode.kind === ts.SyntaxKind.ForStatement) {
          const forStatement = currentNode as ts.ForStatement;
          // Count initializer (if it's an expression or var declaration)
          if (forStatement.initializer) {
            if (ts.isVariableDeclarationList(forStatement.initializer)) {
              // Each declaration in VariableDeclarationList is a statement part
              // count += forStatement.initializer.declarations.length; // or just 1 for the whole list?
              // ProjectCodeMeter: "for (i=0; i < 5; i++;)" is 3 LLOC.
              // `let i = 0` is one VariableStatement.
              count++; // Count VariableStatement as one.
            } else { // It's an Expression
              count++; // Count initializer expression.
            }
          }
          // Count condition (if it exists)
          if (forStatement.condition) {
            count++;
          }
          // Count incrementor (if it exists)
          if (forStatement.incrementor) {
            count++;
          }
          // The ForStatement node itself is NOT counted additionally here,
          // as its parts are counted.
          // Now, recurse into the statement body of the for loop.
          countRecursive(forStatement.statement);
          return; // Avoid double counting or incorrect further processing of the ForStatement itself.
        } else if (currentNode.kind === ts.SyntaxKind.ForInStatement) {
            const forInStatement = currentNode as ts.ForInStatement;
            if (forInStatement.initializer) count++; // e.g. `const key`
            if (forInStatement.expression) count++;  // e.g. `in object`
            // Recurse into body
            countRecursive(forInStatement.statement);
            return;
        } else if (currentNode.kind === ts.SyntaxKind.ForOfStatement) {
            const forOfStatement = currentNode as ts.ForOfStatement;
            if (forOfStatement.initializer) count++; // e.g. `const item`
            if (forOfStatement.expression) count++;   // e.g. `of array`
            // Recurse into body
            countRecursive(forOfStatement.statement);
            return;
        } else if (currentNode.kind === ts.SyntaxKind.Block && ts.isFunctionLike(currentNode.parent)) {
            // Do not count a Block if it's the body of a function/method, the FunctionDeclaration/MethodDeclaration itself is the statement.
            // However, an empty block used as a statement: {} should be counted.
            // If the block is part of an if/else, while, etc., it's also not counted itself, but its children are.
            if (currentNode.statements.length === 0 && !ts.isFunctionLike(currentNode.parent) && !ts.isIfStatement(currentNode.parent) && !ts.isTryStatement(currentNode.parent) && !ts.isCatchClause(currentNode.parent) && !ts.isWhileStatement(currentNode.parent) && !ts.isDoStatement(currentNode.parent) && !ts.isForStatement(currentNode.parent) && !ts.isForInStatement(currentNode.parent) && !ts.isForOfStatement(currentNode.parent)) {
                // This is an empty block acting as a statement.
                count++;
            }
            // Always recurse into block statements
            ts.forEachChild(currentNode, countRecursive);
            return; // Handled block, stop further processing of the block itself as a statement.
        } else {
            // Regular statement found
            count++;
        }
      }

      // Always recurse into children, unless handled by specific logic above (like ForStatement body)
      ts.forEachChild(currentNode, countRecursive);
    };

    countRecursive(this.pureNode);
    return count;
  }
}
