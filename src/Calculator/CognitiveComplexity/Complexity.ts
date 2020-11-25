import { ComplexityCountableNode } from './Adapter/ComplexityCountableNode';

export class Complexity {
  public readonly complexity: number;

  public readonly nestDeepCount: number;

  constructor(
    complexityCountableNode: ComplexityCountableNode,
    nestDeepCount: number
  ) {
    this.complexity = complexityCountableNode.isIncrement() ? 1 : 0;
    this.nestDeepCount = complexityCountableNode.isNestingIncrement()
      ? nestDeepCount
      : 0;
  }

  valueOf() {
    return this.complexity + this.nestDeepCount;
  }
}
