import { Decimal } from 'decimal.js';
import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { HalsteadDifficulty } from './HalsteadDifficulty';
import { HalsteadVolume } from './HalsteadVolume';

export class HalsteadEffort implements MetricsValue {
  public readonly type = MetricsType.HalsteadEffort;

  constructor(
    private readonly volume: HalsteadVolume,
    private readonly difficulty: HalsteadDifficulty
  ) {}

  valueOf() {
    const volume = new Decimal(Number(this.volume));
    const difficulty = new Decimal(Number(this.difficulty));

    return volume.mul(difficulty).toNumber();
  }
}
