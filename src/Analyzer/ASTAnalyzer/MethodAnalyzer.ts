import { ASTNode } from '../Adapter/ASTNode';
import { File } from '../Adapter/File';
import { Converter } from '../Adapter/Converter';
import { ASTNodeExtractor } from '../ASTNodeExtractor';
import { CodePoint } from '../Metrics/CodePoint';

type ASTNodeSource = {
  astNode: ASTNode;
  file: File;
};

type MetricsSource<T> = {
  file: File,
  codePoints: CodePoint[],
  countableNode: T,
};

export class MethodAnalyzer<T> {
  constructor(
    private readonly extractor: ASTNodeExtractor,
    private readonly converter: Converter<T>,
  ) {}

  analyze(rootASTNodeList: ASTNodeSource[]): MetricsSource<T>[] {
    return rootASTNodeList.flatMap((rootASTNode) =>
      this.analyzeMethod(rootASTNode)
    );
  }

  private analyzeMethod(rootASTNode: ASTNodeSource): MetricsSource<T>[] {
    const targets = this.extractor.extractMethods(rootASTNode.astNode);

    return targets.map((target) => ({
        file: rootASTNode.file,
        codePoints: target.codePoints,
        countableNode: this.converter.convert(target.astNode),
    }));
  }
}
