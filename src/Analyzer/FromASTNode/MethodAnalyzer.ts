import { inject, injectable } from 'inversify';
import { ASTNodeExtractor } from '../ASTNodeExtractor';
import { Analyzer } from './Analyzer';
import { ASTNodeSource } from './ASTNodeSource';
import { MetricsSource } from './MetricsSource';

@injectable()
export class MethodAnalyzer implements Analyzer {
  constructor(
    @inject(ASTNodeExtractor) private readonly extractor: ASTNodeExtractor,
  ) {}

  analyze(rootASTNodeList: ASTNodeSource[]): MetricsSource[] {
    return rootASTNodeList.flatMap((rootASTNode) =>
      this.analyzeMethod(rootASTNode)
    );
  }

  private analyzeMethod(rootASTNode: ASTNodeSource): MetricsSource[] {
    const targets = this.extractor.extractMethods(rootASTNode.astNode);

    return targets.map((target) => ({
        file: rootASTNode.file,
        codePoints: target.codePoints,
        astNode: target.astNode,
    }));
  }
}
