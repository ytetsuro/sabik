import { ASTNode } from './ASTNode';
import { File } from './File';

export interface ASTGenerator {
  generate(file: File): ASTNode;
}
