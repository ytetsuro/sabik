import { MetricsType } from './MetricsType';

export interface MetricsValue {
  readonly type: MetricsType;
  valueOf(): number;
}
