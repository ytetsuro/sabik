import { ASTNode } from './Adapter/ASTNode';
import { File } from './Adapter/File';
import { CalculatorForAST } from './FromASTNode/CalculatorForAST';
import { CodePoint } from './Metrics/CodePoint';
import { Metrics } from './Metrics/Metrics';
import { CalculatorForMetrics } from './FromOtherMetrics/CalculatorForMetrics';
import { ASTGenerator } from './Adapter/ASTGenerator';
import { inject, injectable, multiInject } from 'inversify';
import { Types } from '../types/Types';

@injectable()
export class Analyzer {
  private readonly metricsMap = new Map<CodePoint, Metrics>();

  constructor(
    @inject(Types.astNodeGenerator)
    private readonly astNodeGenerator: ASTGenerator,
    @multiInject(Types.codeMetricsCalculatorForAST)
    private readonly calculatorForAST: CalculatorForAST[],
    @multiInject(Types.codeMetricsCalculatorForMetrics)
    private readonly calculatorForMetrics: CalculatorForMetrics[]
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
    const analyzedMetricsList = this.calculatorForMetrics.flatMap((analyzer) =>
      analyzer.analyze(metricsList)
    );

    this.setMetricsList(analyzedMetricsList);
  }

  private astAnalyze(fileAndMetricsList: { file: File; astNode: ASTNode }[]) {
    const metricsList = this.calculatorForAST.flatMap((analyzer) =>
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
