import { Maintainability } from './Maintainability';
import { HalsteadVolume } from '../Halstead/MetricsValue/HalsteadVolume';
import { CognitiveComplexity } from '../CognitiveComplexity/CognitiveComplexity';
import { LogicalLineOfCode } from '../LineOfCode/MetricsValue/LogicalLineOfCode';
import { MetricsValue } from '../MetricsValue';
import { Metrics } from '../../Analyzer/Metrics/Metrics';
import { CodePointType } from '../../Analyzer/Metrics/CodePointType';

type TargetMetrics = HalsteadVolume|LogicalLineOfCode|CognitiveComplexity;

export class Calculator {
  readonly targetMetrics = [
    HalsteadVolume,
    LogicalLineOfCode,
    CognitiveComplexity,
  ];

  analyze(metricsList: Metrics[]): Metrics[] {
    return metricsList
      .filter(
        (metrics) =>
          metrics.getMinimalCodePoint()?.type === CodePointType.Method
      )
      .filter((metrics) =>
        metrics.hasMetricsValue(...this.targetMetrics)
      )
      .map((metrics) => ({
        file: metrics.file,
        codePoints: metrics.codePoints,
        values: this.targetMetrics.map(row => metrics.getMetricsByMetricsValue<TargetMetrics>(row)!)
      }))
      .map(
        ({file, codePoints, values}) => new Metrics(
          file,
          codePoints,
          this.calculate(values)
        )
      );
  }

  calculate(metricsList: MetricsValue[]): MetricsValue[] {
    const halsteadVolume = <HalsteadVolume>(
      metricsList.find((row) => row instanceof HalsteadVolume)!
    );
    const logicalLineOfCode = <LogicalLineOfCode>(
      metricsList.find((row) => row instanceof LogicalLineOfCode)!
    );
    const cognitiveComplexity = <CognitiveComplexity>(
      metricsList.find((row) => row instanceof CognitiveComplexity)!
    );

    return [
      new Maintainability(
        halsteadVolume,
        cognitiveComplexity,
        logicalLineOfCode
      ),
    ];
  }
}
