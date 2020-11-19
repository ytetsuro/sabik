import { ASTGenerator } from '../ASTGenerator';
import { MetricsAnalyzer } from './MetricsAnalyzer';
import { Analyzer as SourceCodeAnalyzer } from '../../Analyzer/SourceFile/Analyzer';
import { Analyzer as CodeBlockAnalyzer } from '../../Analyzer/ClassMethodFunctionFauxClass/Analyzer';
import { Calculator } from '../../Calculator/LineOfCode/Calculator';
import { LineOfCode } from '../../Calculator/LineOfCode/LineOfCode';
import { LineOfCodeCountableNode } from '../../Calculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { Metrics } from './Metrics';
import { AnalyzedFactory } from './AnalyzedFactory';
import { Analyzed } from './Analyzed';
import { File } from '../FileFinder/File';
import { LanguageConverter } from './LanguageConverter';

export class Analyzer {
  private astGenerator: ASTGenerator;

  private analyzedFactory: AnalyzedFactory;

  private analyzer: CodeBlockAnalyzer<Metrics, Analyzed>;

  private lineOfCodeAnalyzer: SourceCodeAnalyzer<
    LineOfCodeCountableNode,
    LineOfCode
  >;

  constructor({
    complexityConverter,
    halsteadConverter,
    lineOfCodeConverter,
    astGenerator,
  }: LanguageConverter) {
    this.astGenerator = astGenerator;
    this.analyzedFactory = new AnalyzedFactory();
    this.analyzer = new CodeBlockAnalyzer(
      new MetricsAnalyzer(
        complexityConverter,
        halsteadConverter,
        lineOfCodeConverter
      ),
      this.analyzedFactory
    );
    this.lineOfCodeAnalyzer = new SourceCodeAnalyzer(
      new Calculator(),
      lineOfCodeConverter
    );
  }

  analyze(filePath: File) {
    const astNode = this.astGenerator.generate(filePath.fullPath);
    this.analyzedFactory.setFileMeta(
      filePath.relativePath,
      this.lineOfCodeAnalyzer.analyze(astNode)
    );

    return this.analyzer.analyze(astNode);
  }
}
