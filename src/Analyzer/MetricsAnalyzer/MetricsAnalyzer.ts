import { Metrics } from "../Metrics/Metrics";

export interface MetricsAnalyzer {
  analyze(sources: Metrics[]): Metrics[];
}