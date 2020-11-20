import * as ts from 'typescript';
import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Calculator/CongnitiveComplexity/Adapter/ComplexityCountableNode';
import { ASTNode } from './ASTNode';

export class ComplexityCountableNode
  implements ComplexityCountableNodeInterface {

  private readonly node: ASTNode;

  private readonly pureNode: null;

  constructor(node: ASTNode) {
    this.node = node;
    this.pureNode = null;
  }

  isNestLevelUp() {
    return false;
  }

  isIncrement() {
    return false;
  }

  isNestingIncrement() {
    return false;
  }

  getChilds() {
    return this.node
      .getChilds()
      .map((node) => new ComplexityCountableNode(node));
  }
}
