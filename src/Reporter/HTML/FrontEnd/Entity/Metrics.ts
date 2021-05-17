import { MetricsType } from './MetricsType';
import { MetricsValue } from './MetricsValue';

export class Metrics {
  private overviews: MetricsType[] = [
    MetricsType.CognitiveComplexity,
    MetricsType.HalsteadBugsDelivered,
    MetricsType.Maintainability,
  ];

  constructor(
    public readonly defineName: string,
    private readonly metrics: MetricsValue[],
    private readonly position: { start: number; end: number }
  ) {}

  getStartLineNumber() {
    return this.position.start;
  }

  getEndLineNumber() {
    return this.position.end;
  }

  getOverview() {
    return this.metrics.filter((row) => this.overviews.includes(row.type));
  }

  getDetails() {
    return this.metrics.filter((row) => !this.overviews.includes(row.type));
  }

  getByType(findType: MetricsType) {
    return this.metrics.find(({ type }) => type === findType);
  }
}
