import { Calculator } from './Calculator';
import { MetricsValue } from '../../Calculator/MetricsValue';

export interface MetricsCalculator extends Calculator<MetricsValue[]> {
  readonly targetMetrics: (new (..._: any) => MetricsValue)[];
}
