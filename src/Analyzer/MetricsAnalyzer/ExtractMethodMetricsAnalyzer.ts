import { Metrics } from '../../Analyzer/Metrics/Metrics';
import { MetricsAnalyzer } from '../../Analyzer/MetricsAnalyzer/MetricsAnalyzer';
import { CodePointType } from '../../Analyzer/Metrics/CodePointType';
import { MetricsCalculator } from '../Adapter/MetricsCalculator';

export class ExtractMethodMetricsAnalyzer implements MetricsAnalyzer {
  constructor(private readonly calculator: MetricsCalculator) {}

  analyze(metricsList: Metrics[]): Metrics[] {
    return metricsList
      .filter(
        (metrics) =>
          metrics.getMinimalCodePoint()?.type === CodePointType.Method
      )
      .filter((metrics) =>
        metrics.hasMetricsValue(...this.calculator.targetMetrics)
      )
      .map(
        (metrics) =>
          new Metrics(
            metrics.file,
            metrics.codePoints,
            this.calculator.calculate(
              this.calculator.targetMetrics.map(
                (constructor) => metrics.getMetricsByMetricsValue(constructor)!
              )
            )
          )
      );
  }
}
