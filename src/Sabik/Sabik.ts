import { FileFinder } from './FileFinder/FileFinder';
import { Reporter } from './Reporter';
import { inject, injectable } from 'inversify';
import { Types } from '../types/Types';
import { Language } from './Language/Language';
import { Analyzer } from '../Analyzer/Analyzer';
import { Calculator as CognitiveComplexity } from '../Calculator/CognitiveComplexity/Calculator';
import { Calculator as Halstead } from '../Calculator/Halstead/Calculator';
import { Calculator as LineOfCode } from '../Calculator/LineOfCode/Calculator';
import { ASTNodeExtractor } from '../Analyzer/ASTNodeExtractor';
import { Calculator as Maintainability } from '../Calculator/Maintainability/Calculator';
import { MethodAnalyzer } from '../Analyzer/ASTAnalyzer/MethodAnalyzer';
import { FileAnalyzer } from '../Analyzer/ASTAnalyzer/FileAnalyzer';
import { ExtractMethodMetricsAnalyzer } from '../Analyzer/MetricsAnalyzer/ExtractMethodMetricsAnalyzer';

@injectable()
export class Sabik {

  constructor(
    private language: Language,
    private fileFinder: FileFinder,
    @inject(Types.reporter) private presenter: Reporter
  ) {
  }

  exec(findPath: string) {
    const paths = this.fileFinder.find(findPath);
    const extractor = new ASTNodeExtractor();
    const analyzer = new Analyzer(
      this.language.createASTNodeGenerator(),
      [
        new MethodAnalyzer(extractor, this.language.createCountableNodeConverter('complexityConverter'), new CognitiveComplexity),
        new MethodAnalyzer(extractor, this.language.createCountableNodeConverter('halsteadConverter'), new Halstead),
        new MethodAnalyzer(extractor, this.language.createCountableNodeConverter('lineOfCodeConverter'), new LineOfCode),
        new FileAnalyzer(this.language.createCountableNodeConverter('lineOfCodeConverter'), new LineOfCode),
      ],
      [
        new ExtractMethodMetricsAnalyzer(new Maintainability()),
      ]
    );

    const targetPaths = paths.filter((path) => this.language.isSupport(path.extension));

    const fileMetricsList = analyzer.analyze(targetPaths);

    extractor.clear();
    this.presenter.output(fileMetricsList);
  }
}
