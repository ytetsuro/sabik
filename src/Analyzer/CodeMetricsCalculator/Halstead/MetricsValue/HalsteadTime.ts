import { Decimal } from 'decimal.js';
import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { HalsteadEffort } from './HalsteadEffort';

export class HalsteadTime implements MetricsValue {
  public readonly type = MetricsType.HalsteadTime;

  constructor(private readonly effort: HalsteadEffort) {}

  valueOf() {
    return new Decimal(Number(this.effort)).div(18).toNumber();
  }
}
