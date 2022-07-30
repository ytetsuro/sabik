import { MetricsType } from '../../Metrics/MetricsType';
import { MetricsValue } from '../../Metrics/MetricsValue';
import { ComplexityIncrement } from './ComplexityIncrement';

export class CyclomaticComplexity implements MetricsValue {
  public readonly type = MetricsType.CyclomaticComplexity;

  constructor(private readonly complexities: ComplexityIncrement[]) {}

  valueOf(): number {
    return this.complexities.reduce((prev, next) => Number(prev) + Number(next), 0);
  }
}
