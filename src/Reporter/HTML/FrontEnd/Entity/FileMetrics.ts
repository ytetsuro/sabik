import { Metrics } from './Metrics';
import { MetricsCalculator } from './MetricsCalculator';
import { MetricsType } from './MetricsType';

export class FileMetrics {
  private metricsCalculator: MetricsCalculator;

  constructor(
    public readonly fileName: string,
    private readonly metrics: Metrics,
    public readonly childrenMetrics: Metrics[]
  ) {
    this.metricsCalculator = new MetricsCalculator(childrenMetrics);
  }

  get physicalLineOfCode() {
    return Number(this.metrics.getByType(MetricsType.LineOfCodePhysical) ?? 0);
  }

  get logicalLineOfCode() {
    return Number(this.metrics.getByType(MetricsType.LineOfCodeLogical) ?? 0);
  }

  getMetrics() {
    return this.childrenMetrics.slice().sort((a, b) => a.getStartLineNumber() - b.getStartLineNumber());
  }

  getLength() {
    return this.metricsCalculator.getLength();
  }

  getMaximumCognitiveComplexity() {
    return this.metricsCalculator.max(MetricsType.CognitiveComplexity);
  }

  getAverageCognitiveComplexity() {
    return this.metricsCalculator.average(MetricsType.CognitiveComplexity);
  }

  getMaximumCyclomaticComplexity() {
    return this.metricsCalculator.max(MetricsType.CyclomaticComplexity);
  }

  getAverageCyclomaticComplexity() {
    return this.metricsCalculator.average(MetricsType.CyclomaticComplexity);
  }

  getMaximumBugsDelivered() {
    return this.metricsCalculator.max(MetricsType.HalsteadBugsDelivered);
  }

  getSumBugsDelivered() {
    return this.metricsCalculator.sum(MetricsType.HalsteadBugsDelivered);
  }

  getMinimumMaintainability() {
    return this.metricsCalculator.min(MetricsType.Maintainability);
  }

  getAverageMaintainability() {
    return this.metricsCalculator.average(MetricsType.Maintainability);
  }
}
