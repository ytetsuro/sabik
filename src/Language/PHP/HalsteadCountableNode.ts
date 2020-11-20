import * as ts from 'typescript';
import { HalsteadCountableNode as HalsteadCountableNodeInterface } from '../../Calculator/Halstead/Adapter/HalsteadCountableNode';
import { ASTNode } from './ASTNode';

export class HalsteadCountableNode implements HalsteadCountableNodeInterface {
  private readonly pureNode: null;

  constructor(private readonly node: ASTNode) {
    this.pureNode = null;
  }

  isOperand(): boolean {
    return false;
  }

  isOperator(): boolean {
    return false;
  }


  getText(): string {
    return '';
  }

  getChilds() {
    return this.node.getChilds().map((row) => new HalsteadCountableNode(row));
  }
}
