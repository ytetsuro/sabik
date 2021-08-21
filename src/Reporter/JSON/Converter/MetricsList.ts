import { Metrics } from '../../../Analyzer/Metrics/Metrics';

export class MetricsList {
  constructor(private readonly metricsList: Metrics[]) {}

  toJSON() {
    return this.metricsList.map((row) => {
      const minimalCodePoint = row.getMinimalCodePoint();

      return {
        fileName: row.file.relativePath,
        name: row.getName(),
        codePointType: Number(minimalCodePoint.type),
        startLineNumber: minimalCodePoint.startLineNumber,
        endLineNumber: minimalCodePoint.endLineNumber,
        metricsList: row.metricsValues.map((metrics) => ({
          type: Number(metrics.type),
          typeLabel: metrics.type.label,
          value: Number(metrics),
        })),
      };
    });
  }
}
