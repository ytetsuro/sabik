import * as PHPParser from 'php-parser';
import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Calculator/CongnitiveComplexity/Adapter/ComplexityCountableNode';
import { ASTNode } from './ASTNode';

type BinNode = PHPParser.Node & {type: string};
type IfNode = PHPParser.Node & {alternate: PHPParser.Node};

export class ComplexityCountableNode
  implements ComplexityCountableNodeInterface {

  private static readonly nestLevelUpKinds = [
    'if',
    'catch',
    'switch',
    'for',
    'while',
    'do',
    'retif',
    'function',
    'closure',
    'arrowfunc',
  ];

  private static readonly nestingIncrementSyntaxKinds = [
    'if',
    'catch',
    'switch',
    'for',
    'while',
    'retif',
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
    } else if (this.node.kind === 'label') {
      return true;
    } else if (this.node.kind === 'bin' && ['and', 'or', '&&', '||', 'xor'].includes((<BinNode>this.node.node).type)) {
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
      parent?.kind === 'if' &&
      (<IfNode>parent.node).alternate === this.node.node
    );
  }

  getChilds() {
    return this.node
      .getChilds()
      .map((node) => new ComplexityCountableNode(node));
  }
}
