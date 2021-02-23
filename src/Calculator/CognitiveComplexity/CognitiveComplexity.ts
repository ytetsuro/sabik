import { MetricsType } from '../MetricsType';
import { MetricsValue } from '../MetricsValue';
import { ComplexityIncrement } from './ComplexityIncrement';

export class CognitiveComplexity implements MetricsValue {
  public readonly type = MetricsType.CognitiveComplexity;

  constructor(private readonly complexities: ComplexityIncrement[]) {}

  valueOf(): number {
    return this.complexities.reduce(
      (prev, next) => Number(prev) + Number(next),
      0
    );
  }
}
