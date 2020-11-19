import { ASTNode } from './ASTNode';

export interface Analyzer<T> {
  analyze(astNode: ASTNode): T;
}
