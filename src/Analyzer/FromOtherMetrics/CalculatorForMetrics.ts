import { Metrics } from '../Metrics/Metrics';

export interface CalculatorForMetrics {
  analyze(sources: Metrics[]): Metrics[];
}
