import { Metrics } from '../Metrics/Metrics';
import { ASTNode } from '../Adapter/ASTNode';
import { File } from '../Adapter/File';
import { ASTAnalyzer } from './ASTAnalyzer';
import { Converter } from '../Adapter/Converter';
import { ASTNodeExtractor } from '../ASTNodeExtractor';
import { Calculator } from '../Adapter/Calculator';

type MetricsSource = {
    astNode: ASTNode,
    file: File,
};

export class MethodAnalyzer<T> implements ASTAnalyzer {
    constructor(
        private readonly extractor: ASTNodeExtractor,
        private readonly converter: Converter<T>,
        private readonly calculator: Calculator<T>,
    ) {
    }

  analyze(rootASTNodeList: MetricsSource[]): Metrics[] {
      return rootASTNodeList
        .flatMap(rootASTNode => this.analyzeMethod(rootASTNode));
  }

  private analyzeMethod(rootASTNode: MetricsSource): Metrics[] {
      const targets = this.extractor.extractMethods(rootASTNode.astNode);

      return targets.map(target => {
          const node = this.converter.convert(target.astNode);

          return new Metrics(
              rootASTNode.file,
              target.codePoints,
              this.calculator.calculate(node),
          );
      });
  }
}