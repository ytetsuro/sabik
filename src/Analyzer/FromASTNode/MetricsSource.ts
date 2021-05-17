import { ASTNode } from '../Adapter/ASTNode';
import { File } from '../Adapter/File';
import { CodePoint } from '../Metrics/CodePoint';

export type MetricsSource = {
  file: File;
  codePoints: CodePoint[];
  astNode: ASTNode;
};
