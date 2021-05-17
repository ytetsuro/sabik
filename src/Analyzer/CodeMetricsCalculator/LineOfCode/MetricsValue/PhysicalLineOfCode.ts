import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';

export class PhysicalLineOfCode implements MetricsValue {
  public readonly type = MetricsType.PhysicalLineOfCode;

  constructor(private readonly lineOfCode: number) {}

  valueOf() {
    return this.lineOfCode;
  }
}
