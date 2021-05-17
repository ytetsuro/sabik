import { Metrics } from '../Analyzer/Metrics/Metrics';

export interface Reporter {
  output(metrics: Metrics[]): Promise<void>;
}
