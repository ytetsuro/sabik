import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';

export class LogicalLineOfCode implements MetricsValue {
  public readonly type = MetricsType.LogicalLineOfCode;

  constructor(private readonly lineOfCode: number) {}

  valueOf() {
    return this.lineOfCode;
  }
}
