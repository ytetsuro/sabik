import { FileMetrics } from '../Entity/FileMetrics';
import { MetricsCalculator } from './MetricsCalculator';
import { MetricsType } from './MetricsType';

export class Summary {
  private readonly metricsCalculator: MetricsCalculator;

  constructor(private readonly fileSummaries: FileMetrics[]) {
    this.metricsCalculator = new MetricsCalculator(fileSummaries.flatMap((fileSummary) => fileSummary.childrenMetrics));
  }

  getAverageCognitiveComplexity() {
    return this.metricsCalculator.average(MetricsType.CognitiveComplexity);
  }

  getAverageCyclomaticComplexity() {
    return this.metricsCalculator.average(MetricsType.CyclomaticComplexity);
  }

  getAverageMaintainability() {
    return this.metricsCalculator.average(MetricsType.Maintainability);
  }

  getTotalLineOfCode() {
    const logicalLineOfCode = this.fileSummaries.reduce(
      (current, fileSummary) => current + fileSummary.logicalLineOfCode,
      0
    );

    return logicalLineOfCode;
  }

  getSumBugsDelivered() {
    return this.metricsCalculator.sum(MetricsType.HalsteadBugsDelivered);
  }
}
