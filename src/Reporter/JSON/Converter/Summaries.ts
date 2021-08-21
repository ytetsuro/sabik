import { CognitiveComplexity } from "../../../Analyzer/CodeMetricsCalculator/CognitiveComplexity/CognitiveComplexity";
import { HalsteadBugsDelivered } from "../../../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadBugsDelivered";
import { LogicalLineOfCode } from "../../../Analyzer/CodeMetricsCalculator/LineOfCode/MetricsValue/LogicalLineOfCode";
import { Maintainability } from "../../../Analyzer/CodeMetricsCalculator/Maintainability/Maintainability";
import { CodePointType } from "../../../Analyzer/Metrics/CodePointType";
import { Metrics } from "../../../Analyzer/Metrics/Metrics";
import { MetricsValue, MetricsValueConstructor } from "../../../Analyzer/Metrics/MetricsValue";
import { MetricsCalculator } from "../MetricsCalculator";

type DataModel = {
    value: number,
    name?: string,
};
type CalculateType = 'file'|'method';
type CalculateOperator = 'sum'|'average'|'min'|'max';


export class Summaries {
  private readonly methodCalculator: MetricsCalculator;
  private readonly fileCalculator: MetricsCalculator;
  private readonly summaries = new Map<string, [CalculateType, CalculateOperator, MetricsValueConstructor]>([
      ['LogicalLineOfCode(Sum)', ['file', 'sum', LogicalLineOfCode]],
      ['LogicalLineOfCode(Average per file)', ['file', 'average', LogicalLineOfCode]],
      ['LogicalLineOfCode(Average per method)', ['method', 'average', LogicalLineOfCode]],
      ['CognitiveComplexity(Max)', ['method', 'max', CognitiveComplexity]],
      ['CognitiveComplexity(Average)', ['method', 'average', CognitiveComplexity]],
      ['Maintainability(Min)', ['method', 'min', Maintainability]],
      ['Maintainability(Average)', ['method', 'average', Maintainability]],
      ['BugDelivered(Sum)', ['method', 'sum', HalsteadBugsDelivered]],
      ['BugDelivered(Average)', ['method', 'average', HalsteadBugsDelivered]],
  ]);

  constructor(metrics: Metrics[]) {
    const calculator = new MetricsCalculator(metrics);
    this.methodCalculator = calculator.filter(CodePointType.Method);
    this.fileCalculator = calculator.filter(CodePointType.File);
  }

  toJSON() {
      return [...this.summaries.entries()].reduce((summaries, [summaryName, args]) => ({
          ...summaries,
          [summaryName]: this.convertSummary(...args),
      }), {});
  }

  private convertSummary<T extends MetricsValue>(type: CalculateType, operation: CalculateOperator, metricsType: MetricsValueConstructor<T>): DataModel {
    const calculator = (type === 'file') ? this.fileCalculator : this.methodCalculator;
    const value: Metrics|number = (<(metricsValue: MetricsValueConstructor<T>) => Metrics|number>calculator[operation])(metricsType);

    if (value instanceof Metrics) {
        return {
            name: value.getName(),
            value: Number(value.getMetricsByMetricsValue(metricsType)),
        };
    }

    return {
        value
    };
  }
}