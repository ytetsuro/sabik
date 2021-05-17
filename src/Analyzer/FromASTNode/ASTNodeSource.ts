import { ASTNode } from '../Adapter/ASTNode';
import { File } from '../Adapter/File';

export type ASTNodeSource = {
  astNode: ASTNode;
  file: File;
};