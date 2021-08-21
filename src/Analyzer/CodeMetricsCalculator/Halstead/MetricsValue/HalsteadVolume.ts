import { Decimal } from 'decimal.js';
import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { HalsteadLength } from './HalsteadLength';
import { HalsteadVocabulary } from './HalsteadVocabulary';

export class HalsteadVolume implements MetricsValue {
  public readonly type = MetricsType.HalsteadVolume;
  constructor(private readonly length: HalsteadLength, private readonly vocabulary: HalsteadVocabulary) {}

  valueOf() {
    return new Decimal(Number(this.length)).mul(Decimal.log2(Number(this.vocabulary))).toNumber();
  }
}
