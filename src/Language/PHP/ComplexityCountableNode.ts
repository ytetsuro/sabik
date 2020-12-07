import * as PHPParser from 'php-parser';
import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Calculator/CognitiveComplexity/Adapter/ComplexityCountableNode';
import { ASTNode } from './ASTNode';
import {ASTKind} from './ASTKind';

type BinNode = PHPParser.Node & {type: string};
type IfNode = PHPParser.Node & {alternate: PHPParser.Node};

export class ComplexityCountableNode
  implements ComplexityCountableNodeInterface {

  private static readonly nestLevelUpKinds = [
    ASTKind.IF,
    ASTKind.CATCH,
    ASTKind.SWITCH,
    ASTKind.FOR,
    ASTKind.WHILE,
    ASTKind.DO,
    ASTKind.RETURN_IF,
    ASTKind.FUNCTION,
    ASTKind.CLOSURE,
    ASTKind.ARROW_FUNCTION,
  ];

  private static readonly nestingIncrementSyntaxKinds = [
    ASTKind.IF,
    ASTKind.CATCH,
    ASTKind.SWITCH,
    ASTKind.FOR,
    ASTKind.WHILE,
    ASTKind.RETURN_IF,
  ];

  private readonly node: ASTNode;

  constructor(node: ASTNode) {
    this.node = node;
  }

  isNestLevelUp() {
    return (
      !this.isElse() &&
      ComplexityCountableNode.nestLevelUpKinds.includes(this.node.kind)
    );
  }

  isIncrement() {
    if (this.isElse()) {
      return true;
    } else if (ComplexityCountableNode.nestingIncrementSyntaxKinds.includes(this.node.kind)) {
      return true;
    } else if (this.node.kind === ASTKind.LABEL) {
      return true;
    } else if (this.node.kind === ASTKind.BIN && ['and', 'or', '&&', '||', 'xor'].includes((<BinNode>this.node.node).type)) {
      return true;
    }

    return false;
  }

  isNestingIncrement() {
    if (this.isElse()) {
      return false;
    }

    return ComplexityCountableNode.nestingIncrementSyntaxKinds.includes(
      this.node.kind
    );
  }

  private isElse() {
    const parent = this.node.parentNode;

    return (
      parent?.kind === ASTKind.IF &&
      (<IfNode>parent.node).alternate === this.node.node
    );
  }

  getChildren() {
    return this.node
      .getChildren()
      .map((node) => new ComplexityCountableNode(node));
  }
}
