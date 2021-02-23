import { ComplexityCountableNode } from './Adapter/ComplexityCountableNode';
import { ComplexityIncrement } from './ComplexityIncrement';
import { CognitiveComplexity } from './CognitiveComplexity';

export class Calculator {
  calculate(node: ComplexityCountableNode): CognitiveComplexity[] {
    const complexities = this.extractComplexity(node, 0);

    return [new CognitiveComplexity(complexities)];
  }

  private extractComplexity(
    node: ComplexityCountableNode,
    nest: number
  ): ComplexityIncrement[] {
    const result: ComplexityIncrement[] = [];

    if (node.isIncrement()) {
      result.push(new ComplexityIncrement(node, nest));
    }

    if (node.isNestLevelUp()) {
      const incrementedNest = nest + 1;
      return result.concat(
        ...node
          .getChildren()
          .map((row) => this.extractComplexity(row, incrementedNest))
          .filter((row) => row.length > 0)
      );
    }

    return result.concat(
      ...node.getChildren().map((row) => this.extractComplexity(row, nest))
    );
  }
}