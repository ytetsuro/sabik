import { ASTNode } from '../Adapter/ASTNode';
import { File } from '../Adapter/File';
import { Converter } from '../Adapter/Converter';
import { CodePoint } from '../Metrics/CodePoint';
import { CodePointType } from '../Metrics/CodePointType';

type ASTNodeSource = {
  astNode: ASTNode;
  file: File;
};

type MetricsSource<T> = {
  file: File,
  codePoints: CodePoint[],
  countableNode: T,
};

export class FileAnalyzer<T> {
  constructor(
    private readonly converter: Converter<T>,
  ) {}

  analyze(rootASTNodeList: ASTNodeSource[]): MetricsSource<T>[] {
    return rootASTNodeList.map((rootASTNode) => this.analyzeFile(rootASTNode));
  }

  analyzeFile(rootASTNode: ASTNodeSource): MetricsSource<T> {
    const countableNode = this.converter.convert(rootASTNode.astNode);

    return {
      file: rootASTNode.file,
      codePoints: [new CodePoint(
        CodePointType.File,
        rootASTNode.file.fullPath,
        rootASTNode.astNode.getStartLineNumber(),
        rootASTNode.astNode.getEndLineNumber()
      )],
      countableNode,
    };
  }
}
