import { Metrics } from '../Metrics/Metrics';
import { ASTNode } from '../Adapter/ASTNode';
import { File } from '../Adapter/File';
import { ASTAnalyzer } from './ASTAnalyzer';
import { Converter } from '../Adapter/Converter';
import { ASTNodeExtractor } from '../ASTNodeExtractor';
import { CodePoint } from '../Metrics/CodePoint';
import { CodePointType } from '../Metrics/CodePointType';
import { Calculator } from '../Adapter/Calculator';

type MetricsSource = {
  astNode: ASTNode;
  file: File;
};

export class FileAnalyzer<T> implements ASTAnalyzer {
  constructor(
    private readonly converter: Converter<T>,
    private readonly calculator: Calculator<T>
  ) {}

  analyze(rootASTNodeList: MetricsSource[]): Metrics[] {
    return rootASTNodeList.map((rootASTNode) => this.analyzeFile(rootASTNode));
  }

  analyzeFile(rootASTNode: MetricsSource): Metrics {
    const countableNode = this.converter.convert(rootASTNode.astNode);

    return new Metrics(
      rootASTNode.file,
      [
        new CodePoint(
          CodePointType.File,
          rootASTNode.file.fullPath,
          rootASTNode.astNode.getStartLineNumber(),
          rootASTNode.astNode.getEndLineNumber()
        ),
      ],
      this.calculator.calculate(countableNode)
    );
  }
}
