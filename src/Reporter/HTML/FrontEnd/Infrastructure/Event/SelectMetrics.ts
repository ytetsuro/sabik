import { Event } from './Event';
import { Metrics } from '../../Entity/Metrics';

export class SelectMetrics extends Event<Metrics | null, Metrics | null> {
  protected async hook(metrics: Metrics | null) {
    return metrics;
  }
}
