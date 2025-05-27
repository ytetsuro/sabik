import { ASTNode } from '../../../Adapter/ASTNode';

export interface LineOfCodeCountableNode {
  readonly astNode: ASTNode;
  getText(): string;
  getRemovedCommentAndEmptyLineText(): string;
  countStatements(): number;
}
