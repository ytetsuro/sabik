import { CodePoint } from './CodePoint';
import { MetricsValue, MetricsValueConstructor } from './MetricsValue';
import { File } from '../Adapter/File';

export class Metrics {
  constructor(
    public readonly file: File,
    public readonly codePoints: ReadonlyArray<CodePoint>,
    public readonly metricsValues: ReadonlyArray<MetricsValue>
  ) {}

  hasMetricsValue(...values: MetricsValueConstructor[]): boolean {
    return values.every((constructor) => this.getMetricsByMetricsValue(constructor) !== null);
  }

  getMetricsByMetricsValue<T extends MetricsValue>(constructor: MetricsValueConstructor<T>): T | null {
    return <T | null>this.metricsValues.find((metricsValue) => metricsValue instanceof constructor) ?? null;
  }

  merge(metrics: Metrics) {
    return new Metrics(this.file, this.codePoints, [...metrics.metricsValues, ...this.metricsValues]);
  }

  getMinimalCodePoint() {
    return this.codePoints.reduce((current, row) => (current?.type?.isMoreDetail?.(row.type) ?? false ? row : current));
  }

  getName() {
    return this.codePoints
      .slice()
      .sort((a, b) => Number(a.type) - Number(b.type))
      .map(({ name }) => name)
      .join('.');
  }

  toJSON() {
    const minimalCodePoint = this.getMinimalCodePoint();

    return {
      fileName: this.file.relativePath,
      name: this.getName(),
      codePointType: Number(minimalCodePoint.type),
      startLineNumber: minimalCodePoint.startLineNumber,
      endLineNumber: minimalCodePoint.endLineNumber,
      metricsList: this.metricsValues.map((metrics) => ({
        type: Number(metrics.type),
        typeLabel: metrics.type.label,
        value: Number(metrics),
      })),
    };
  }
}
