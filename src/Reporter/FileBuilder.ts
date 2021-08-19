import { Metrics } from '../Analyzer/Metrics/Metrics';

export interface FileBuilder {
  build(metrics: Metrics[]): Promise<void | void[]>;
}
