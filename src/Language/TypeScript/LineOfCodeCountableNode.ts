import { injectable } from 'inversify';
import * as ts from 'typescript';
import { LineOfCodeCountableNode as LineOfCodeCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { type ASTNode as TypeScriptASTNodeWrapper } from './ASTNode'; // Renamed for clarity

// Updated STATEMENT_KINDS
const STATEMENT_KINDS = new Set<ts.SyntaxKind>([
  // ts.SyntaxKind.Block, // Removed, handled by _handleBlock for empty ones
  ts.SyntaxKind.BreakStatement,
  ts.SyntaxKind.ContinueStatement,
  ts.SyntaxKind.DebuggerStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.EmptyStatement, // Explicit empty statement ";"
  ts.SyntaxKind.ExpressionStatement,
  ts.SyntaxKind.ForInStatement,
  ts.SyntaxKind.ForOfStatement,
  ts.SyntaxKind.ForStatement,
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
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.CaseClause,      // Added
  ts.SyntaxKind.DefaultClause,   // Added
  // ts.SyntaxKind.CatchClause? Usually the block inside is what matters.
]);

@injectable()
export class LineOfCodeCountableNode implements LineOfCodeCountableNodeInterface {
  private readonly pureNode: ts.Node;
  private statementCount = 0; // Added class property

  constructor(private readonly wrapperNode: TypeScriptASTNodeWrapper) {
    this.pureNode = wrapperNode.node; // Assuming 'node' property holds the actual ts.Node
  }

  getText() {
    return this.pureNode.getFullText();
  }

  getRemovedCommentAndEmptyLineText() {
    const nodeText = this.pureNode.getFullText();
    const sourceFile = ts.createSourceFile(
      'dummy.ts',
      nodeText,
      ts.ScriptTarget.ESLatest,
      false
    );
    const printer = ts.createPrinter({ removeComments: true });
    if (this.pureNode.kind === ts.SyntaxKind.SourceFile) {
        return printer.printFile(this.pureNode as ts.SourceFile);
    }
    // Fallback for other node types, attempting to print the first statement or the node itself
    // This part might need more robust handling for arbitrary node types if precise comment removal is critical.
    const firstStatement = sourceFile.statements.length > 0 ? sourceFile.statements[0] : this.pureNode;
    let printedText = printer.printNode(ts.EmitHint.Unspecified, firstStatement, sourceFile);

    // Remove empty lines from the comment-stripped text
    return printedText.split('\n').filter(line => line.trim() !== '').join('\n');
  }

  // Rewritten countStatements public method
  public countStatements(): number {
    this.statementCount = 0;
    this._traverseAndCount(this.pureNode, 0); // Initial depth is 0
    return this.statementCount;
  }

  // Core private recursive method _traverseAndCount
  private _traverseAndCount(currentNode: ts.Node | undefined, currentDepth: number): void {
    if (!currentNode) {
      return;
    }

    // Handle specific container-like structures first
    switch (currentNode.kind) {
      case ts.SyntaxKind.Block:
        this._handleBlock(currentNode as ts.Block, currentDepth);
        return;
      case ts.SyntaxKind.ForStatement:
        this._handleForStatement(currentNode as ts.ForStatement, currentDepth);
        return;
      case ts.SyntaxKind.ForInStatement:
        this._handleForInStatement(currentNode as ts.ForInStatement, currentDepth);
        return;
      case ts.SyntaxKind.ForOfStatement:
        this._handleForOfStatement(currentNode as ts.ForOfStatement, currentDepth);
        return;
      case ts.SyntaxKind.IfStatement:
        this._handleIfStatement(currentNode as ts.IfStatement, currentDepth);
        return;
      case ts.SyntaxKind.SwitchStatement:
        this._handleSwitchStatement(currentNode as ts.SwitchStatement, currentDepth);
        return;
      case ts.SyntaxKind.TryStatement:
        this._handleTryStatement(currentNode as ts.TryStatement, currentDepth);
        return;
    }

    if (this._isCountableStatement(currentNode, currentDepth)) {
      this.statementCount++;
    }

    ts.forEachChild(currentNode, (child) => this._traverseAndCount(child, currentDepth));
  }

  // Private helper method _isCountableStatement
  private _isCountableStatement(node: ts.Node, currentStatementDepth: number): boolean {
    if (currentStatementDepth > 2) { // Max depth is 2
      return false;
    }
    if (node.kind === ts.SyntaxKind.Block) {
      // Blocks themselves are not counted by this generic check.
      // _handleBlock decides if an empty block is counted.
      return false;
    }
    return STATEMENT_KINDS.has(node.kind);
  }

  // Private helper method _handleBlock
  private _handleBlock(blockNode: ts.Block, currentBlockDepth: number): void {
    if (
      blockNode.statements.length === 0 &&
      currentBlockDepth <= 2 && 
      !ts.isFunctionLike(blockNode.parent) &&
      !ts.isIfStatement(blockNode.parent) &&
      !ts.isForStatement(blockNode.parent) &&
      !ts.isForInStatement(blockNode.parent) &&
      !ts.isForOfStatement(blockNode.parent) &&
      !ts.isWhileStatement(blockNode.parent) &&
      !ts.isDoStatement(blockNode.parent) &&
      !ts.isTryStatement(blockNode.parent) &&
      !ts.isCatchClause(blockNode.parent) &&
      !ts.isSwitchStatement(blockNode.parent)
    ) {
      this.statementCount++;
    }

    const statementsDepth = currentBlockDepth + 1;
    blockNode.statements.forEach(statement => {
      this._traverseAndCount(statement, statementsDepth);
    });
  }

  // Private helper method _handleForStatement
  private _handleForStatement(forNode: ts.ForStatement, currentContextDepth: number): void {
    const statementDepthForParts = currentContextDepth + 1;

    if (forNode.initializer) {
      if (this._isCountableStatement(forNode.initializer, statementDepthForParts)) {
          this.statementCount++;
      } else if (ts.isVariableDeclarationList(forNode.initializer)) {
          if (statementDepthForParts <= 2) this.statementCount++;
      }
    }
    if (forNode.condition) {
      if (statementDepthForParts <= 2) this.statementCount++;
    }
    if (forNode.incrementor) {
      if (statementDepthForParts <= 2) this.statementCount++;
    }
    // The body of the for loop. If it's a block, _handleBlock will manage depth.
    // If not a block, it's a single statement evaluated at currentContextDepth + 1 effectively.
    // However, _traverseAndCount on a non-block statement uses currentContextDepth for _isCountableStatement,
    // and _handleBlock for a block body will use currentContextDepth + 1 for its internal statements.
    // The for loop's body should be considered at currentContextDepth + 1.
    // So, if forNode.statement is NOT a block, its depth should be statementDepthForParts.
    // If it IS a block, _handleBlock will take currentContextDepth and then use currentContextDepth + 1 for its children.
    // This seems a bit tricky. Let's pass currentContextDepth for the body, and let _handleBlock manage its own children's depth.
    // For a single statement body, it should be treated as if it's in a block of depth currentContextDepth + 1.
    // So, its direct count check depth should be currentContextDepth + 1.
    this._traverseAndCount(forNode.statement, currentContextDepth + 1);
  }

  // Private helper method _handleForInStatement
  private _handleForInStatement(forInNode: ts.ForInStatement, currentContextDepth: number): void {
    // The ForInStatement itself is the primary statement.
    if (this._isCountableStatement(forInNode, currentContextDepth)) {
      this.statementCount++;
    }
    // The initializer (e.g., const key) is part of the ForInStatement, not usually a separate LLOC.
    // ProjectCodeMeter counts `for (x in y)` as 1.
    // Traversing the body.
    this._traverseAndCount(forInNode.statement, currentContextDepth + 1);
  }

  // Private helper method _handleForOfStatement
  private _handleForOfStatement(forOfNode: ts.ForOfStatement, currentContextDepth: number): void {
    // The ForOfStatement itself is the primary statement.
    if (this._isCountableStatement(forOfNode, currentContextDepth)) {
      this.statementCount++;
    }
    // The initializer (e.g., const item) is part of the ForOfStatement.
    // Traversing the body.
    this._traverseAndCount(forOfNode.statement, currentContextDepth + 1);
  }
  
  // Private helper method _handleIfStatement
  private _handleIfStatement(ifNode: ts.IfStatement, currentContextDepth: number): void {
    if (this._isCountableStatement(ifNode, currentContextDepth)) {
      this.statementCount++;
    }
    // 'then' statement/block. Children are at an increased depth.
    this._traverseAndCount(ifNode.thenStatement, currentContextDepth + 1);
    if (ifNode.elseStatement) {
      // 'else' statement/block. Children are at an increased depth.
      this._traverseAndCount(ifNode.elseStatement, currentContextDepth + 1);
    }
  }

  // Private helper method _handleSwitchStatement
  private _handleSwitchStatement(switchNode: ts.SwitchStatement, currentContextDepth: number): void {
    if (this._isCountableStatement(switchNode, currentContextDepth)) {
      this.statementCount++;
    }
    // CaseBlock clauses are at the next depth level.
    const clauseDepth = currentContextDepth + 1;
    switchNode.caseBlock.clauses.forEach(clause => {
      // Each CaseClause / DefaultClause is a statement.
      if (this._isCountableStatement(clause, clauseDepth)) {
        this.statementCount++;
      }
      // Statements within the clause are at the same depth as the clause.
      clause.statements.forEach(statement => {
          this._traverseAndCount(statement, clauseDepth);
      });
    });
  }

  // Private helper method _handleTryStatement
  private _handleTryStatement(tryNode: ts.TryStatement, currentContextDepth: number): void {
    if (this._isCountableStatement(tryNode, currentContextDepth)) {
      this.statementCount++;
    }
    // tryBlock, catchClause.block, and finallyBlock are themselves Blocks.
    // _traverseAndCount will delegate to _handleBlock, which then increments depth for statements inside.
    // So, pass currentContextDepth + 1 to ensure the blocks themselves are considered at the next level.
    const blockContentDepth = currentContextDepth + 1;
    this._traverseAndCount(tryNode.tryBlock, blockContentDepth); 
    if (tryNode.catchClause) {
      // The CatchClause itself is not in STATEMENT_KINDS. Its block's content is what matters.
      this._traverseAndCount(tryNode.catchClause.block, blockContentDepth);
    }
    if (tryNode.finallyBlock) {
      this._traverseAndCount(tryNode.finallyBlock, blockContentDepth);
    }
  }
}
