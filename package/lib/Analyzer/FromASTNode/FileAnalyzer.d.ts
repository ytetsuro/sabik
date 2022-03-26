import { Analyzer } from './Analyzer';
import { ASTNodeSource } from './ASTNodeSource';
import { MetricsSource } from './MetricsSource';
export declare class FileAnalyzer implements Analyzer {
    analyze(rootASTNodeList: ASTNodeSource[]): MetricsSource[];
    private analyzeFile;
}
