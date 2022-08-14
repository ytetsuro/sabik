import { ComplexityCountableNode } from './Adapter/ComplexityCountableNode';

export class ComplexityIncrement {
  public readonly complexity: number;

  constructor(complexityCountableNode: ComplexityCountableNode) {
    this.complexity = complexityCountableNode.isIncrement() ? 1 : 0;
  }

  valueOf() {
    return this.complexity;
  }
}
