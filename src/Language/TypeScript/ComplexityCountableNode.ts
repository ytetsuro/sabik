import { injectable } from 'inversify';
import * as ts from 'typescript';
import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/CognitiveComplexity/Adapter/ComplexityCountableNode';
import { ASTNode } from './ASTNode';

@injectable()
export class ComplexityCountableNode implements ComplexityCountableNodeInterface {
  private static readonly nestLevelUpKinds = [
    ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.SwitchStatement,
    ts.SyntaxKind.CatchClause,
    ts.SyntaxKind.ForInStatement,
    ts.SyntaxKind.ForOfStatement,
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.WhileStatement,
    ts.SyntaxKind.DoStatement,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.FunctionExpression,
    ts.SyntaxKind.ConditionalExpression,
  ];

  private static readonly nestingIncrementSyntaxKinds = [
    ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.SwitchStatement,
    ts.SyntaxKind.ForInStatement,
    ts.SyntaxKind.ForOfStatement,
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.WhileStatement,
    ts.SyntaxKind.CatchClause,
    ts.SyntaxKind.ConditionalExpression,
  ];

  private static readonly incrementSyntaxKinds = [
    ts.SyntaxKind.AmpersandAmpersandToken,
    ts.SyntaxKind.BarBarToken,
    ts.SyntaxKind.LabeledStatement,
  ];

  private readonly node: ASTNode;

  private readonly pureNode: ts.Node;

  constructor(node: ASTNode) {
    this.node = node;
    this.pureNode = node.node;
  }

  isNestLevelUp() {
    return !this.isElse() && ComplexityCountableNode.nestLevelUpKinds.includes(this.pureNode.kind);
  }

  isIncrement() {
    if (this.isElse()) {
      return true;
    }

    const allIncrementSyntaxKinds = ComplexityCountableNode.incrementSyntaxKinds.concat(
      ...ComplexityCountableNode.nestingIncrementSyntaxKinds
    );

    return allIncrementSyntaxKinds.includes(this.pureNode.kind);
  }

  isNestingIncrement() {
    if (this.isElse()) {
      return false;
    }

    return ComplexityCountableNode.nestingIncrementSyntaxKinds.includes(this.pureNode.kind);
  }

  private isElse() {
    const parent = this.pureNode.parent;
    return parent.kind === ts.SyntaxKind.IfStatement && (<ts.IfStatement>parent).elseStatement === this.pureNode;
  }

  getChildren() {
    return this.node.getChildren().map((node) => new ComplexityCountableNode(node));
  }
}
