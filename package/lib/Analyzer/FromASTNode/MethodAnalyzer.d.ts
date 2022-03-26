import { ASTNodeExtractor } from '../ASTNodeExtractor';
import { Analyzer } from './Analyzer';
import { ASTNodeSource } from './ASTNodeSource';
import { MetricsSource } from './MetricsSource';
export declare class MethodAnalyzer implements Analyzer {
    private readonly extractor;
    constructor(extractor: ASTNodeExtractor);
    analyze(rootASTNodeList: ASTNodeSource[]): MetricsSource[];
    private analyzeMethod;
}
