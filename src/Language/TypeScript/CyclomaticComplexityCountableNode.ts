import { injectable } from 'inversify';
import * as ts from 'typescript';
import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/CyclomaticComplexity/Adapter/ComplexityCountableNode';
import { ASTNode } from './ASTNode';

@injectable()
export class CyclomaticComplexityCountableNode implements ComplexityCountableNodeInterface {
  private static readonly incrementSyntaxKinds = [
    ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.SwitchStatement,
    ts.SyntaxKind.ForInStatement,
    ts.SyntaxKind.ForOfStatement,
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.WhileStatement,
    ts.SyntaxKind.CatchClause,
    ts.SyntaxKind.ConditionalExpression,
    ts.SyntaxKind.AmpersandAmpersandToken,
    ts.SyntaxKind.BarBarToken,
    ts.SyntaxKind.LabeledStatement,
    ts.SyntaxKind.QuestionQuestionToken,
    ts.SyntaxKind.QuestionDotToken,
  ];

  private readonly node: ASTNode;

  private readonly pureNode: ts.Node;

  constructor(node: ASTNode) {
    this.node = node;
    this.pureNode = node.node;
  }

  isIncrement() {
    const allIncrementSyntaxKinds = CyclomaticComplexityCountableNode.incrementSyntaxKinds;

    return allIncrementSyntaxKinds.includes(this.pureNode.kind);
  }

  getChildren() {
    return this.node.getChildren().map((node) => new CyclomaticComplexityCountableNode(node));
  }
}
