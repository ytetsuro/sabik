import { Decimal } from 'decimal.js';
import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { HalsteadVolume } from './HalsteadVolume';

export class HalsteadBugsDelivered implements MetricsValue {
  public readonly type = MetricsType.HalsteadBugsDelivered;

  constructor(private readonly volume: HalsteadVolume) {}

  valueOf() {
    return new Decimal(Number(this.volume)).div(3000).toNumber();
  }
}
