import { inject, injectable } from 'inversify';
import { Types } from '../../types/Types';
import { Converter } from '../Adapter/Converter';
import { CodePoint } from '../Metrics/CodePoint';
import { CodePointType } from '../Metrics/CodePointType';
import { Analyzer } from './Analyzer';
import { ASTNodeSource } from './ASTNodeSource';
import { MetricsSource } from './MetricsSource';

@injectable()
export class FileAnalyzer implements Analyzer {
  analyze(rootASTNodeList: ASTNodeSource[]): MetricsSource[] {
    return rootASTNodeList.map((rootASTNode) => this.analyzeFile(rootASTNode));
  }

  private analyzeFile(rootASTNode: ASTNodeSource): MetricsSource {
    return {
      file: rootASTNode.file,
      codePoints: [
        new CodePoint(
          CodePointType.File,
          rootASTNode.file.fullPath,
          rootASTNode.astNode.getStartLineNumber(),
          rootASTNode.astNode.getEndLineNumber()
        ),
      ],
      astNode: rootASTNode.astNode,
    };
  }
}
