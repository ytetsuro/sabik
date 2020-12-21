import { Metrics } from './Metrics';
import { MetricsCalculator } from './MetricsCalculator';
import { MetricsType } from './MetricsType';

interface LineOfCode {
  readonly physical: number;
  readonly logical: number;
}

export class FileMetrics {
  private metricsCalculator: MetricsCalculator;

  constructor(
    public readonly fileName: string,
    private readonly lineOfCode: LineOfCode,
    public readonly metrics: Metrics[]
  ) {
    this.metricsCalculator = new MetricsCalculator(metrics);
  }

  get physicalLineOfCode() {
    return this.lineOfCode.physical;
  }

  get logicalLineOfCode() {
    return this.lineOfCode.logical;
  }

  getMetrics() {
    return this.metrics
      .slice()
      .sort((a, b) => a.getStartLineNumber() - b.getStartLineNumber());
  }

  getLength() {
    return this.metricsCalculator.getLength();
  }

  getMaximumComplexity() {
    return this.metricsCalculator.max(MetricsType.CognitiveComplexity);
  }

  getAverageComplexity() {
    return this.metricsCalculator.average(MetricsType.CognitiveComplexity);
  }

  getMaximumBugsDelivered() {
    return this.metricsCalculator.max(MetricsType.BugsDelivered);
  }

  getSumBugsDelivered() {
    return this.metricsCalculator.sum(MetricsType.BugsDelivered);
  }

  getMinimumMaintainability() {
    return this.metricsCalculator.min(MetricsType.Maintainability);
  }

  getAverageMaintainability() {
    return this.metricsCalculator.average(MetricsType.Maintainability);
  }
}
