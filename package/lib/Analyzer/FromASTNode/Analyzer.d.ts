import { ASTNodeSource } from './ASTNodeSource';
import { MetricsSource } from './MetricsSource';
export interface Analyzer {
    analyze(rootASTNodeList: ASTNodeSource[]): MetricsSource[];
}
