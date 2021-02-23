import { MetricsType } from '../../MetricsType';
import { MetricsValue } from '../../MetricsValue';

export class LogicalLineOfCode implements MetricsValue {
  public readonly type = MetricsType.LogicalLineOfCode;

  constructor(private readonly lineOfCode: number) {}

  valueOf() {
    return this.lineOfCode;
  }
}
