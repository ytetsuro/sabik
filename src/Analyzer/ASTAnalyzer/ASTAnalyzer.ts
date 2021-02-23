import { Metrics } from '../Metrics/Metrics';
import { ASTNode } from '../Adapter/ASTNode';
import { File } from '../Adapter/File';

type MetricsSource = {
    astNode: ASTNode,
    file: File,
};

export interface ASTAnalyzer {
  analyze(metricsSources: MetricsSource[]): Metrics[];
}