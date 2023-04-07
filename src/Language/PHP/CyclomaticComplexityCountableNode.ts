import * as PHPParser from 'php-parser';
import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/CyclomaticComplexity/Adapter/ComplexityCountableNode';
import { type ASTNode } from './ASTNode';
import { ASTKind } from './ASTKind';
import { injectable } from 'inversify';

type BinNode = PHPParser.Node & { type: string };
type AssignNode = PHPParser.Node & { operator: string };

@injectable()
export class CyclomaticComplexityCountableNode implements ComplexityCountableNodeInterface {
  private static readonly incrementSyntaxKinds = [
    ASTKind.IF,
    ASTKind.CATCH,
    ASTKind.SWITCH,
    ASTKind.FOR,
    ASTKind.WHILE,
    ASTKind.RETURN_IF,
    ASTKind.MATCH_ARM,
  ];

  private readonly node: ASTNode;

  constructor(node: ASTNode) {
    this.node = node;
  }

  isIncrement() {
    if (CyclomaticComplexityCountableNode.incrementSyntaxKinds.includes(this.node.kind)) {
      return true;
    } else if (this.node.kind === ASTKind.LABEL) {
      return true;
    } else if (this.node.kind === ASTKind.ASSIGN && ['??='].includes((<AssignNode>this.node.node).operator)) {
      return true;
    } else if (
      this.node.kind === ASTKind.BIN &&
      ['and', 'or', '&&', '||', 'xor', '??'].includes((<BinNode>this.node.node).type)
    ) {
      return true;
    }

    return false;
  }

  getChildren() {
    return this.node.getChildren().map((node) => new CyclomaticComplexityCountableNode(node));
  }
}
