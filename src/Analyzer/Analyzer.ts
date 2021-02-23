import { ASTNode } from './Adapter/ASTNode';
import { File } from './Adapter/File';
import { ASTAnalyzer } from './ASTAnalyzer/ASTAnalyzer';
import { CodePoint } from './Metrics/CodePoint';
import { Metrics } from './Metrics/Metrics';
import { MetricsAnalyzer } from './MetricsAnalyzer/MetricsAnalyzer';
import { ASTGenerator } from './Adapter/ASTGenerator';

export class Analyzer {
  private readonly metricsMap = new Map<CodePoint, Metrics>();

  constructor(
    private readonly astNodeGenerator: ASTGenerator,
    private readonly astAnalyzers: ASTAnalyzer[],
    private readonly metricsAnalyzers: MetricsAnalyzer[]
  ) {}

  analyze(files: File[]) {
    this.metricsMap.clear();
    const fileAndMetricsList = files.map((file) => ({
      file,
      astNode: this.astNodeGenerator.generate(file),
    }));

    this.astAnalyze(fileAndMetricsList);
    this.metricsAnalyze([...this.metricsMap.values()]);

    return [...this.metricsMap.values()];
  }

  private metricsAnalyze(metricsList: Metrics[]) {
    const analyzedMetricsList = this.metricsAnalyzers.flatMap((analyzer) =>
      analyzer.analyze(metricsList)
    );

    this.setMetricsList(analyzedMetricsList);
  }

  private astAnalyze(fileAndMetricsList: { file: File; astNode: ASTNode }[]) {
    const metricsList = this.astAnalyzers.flatMap((analyzer) =>
      analyzer.analyze(fileAndMetricsList)
    );

    this.setMetricsList(metricsList);
  }

  private setMetricsList(metricsList: Metrics[]) {
    metricsList.forEach((metrics) => {
      const minimalCodePoint = metrics.getMinimalCodePoint();
      const currentMetrics =
        this.metricsMap.get(minimalCodePoint) ??
        new Metrics(metrics.file, metrics.codePoints, []);

      this.metricsMap.set(minimalCodePoint, currentMetrics.merge(metrics));
    });
  }
}
