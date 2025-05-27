
export interface LineOfCodeCountableNode {
  getText(): string;
  getRemovedCommentAndEmptyLineText(): string;
  countStatements(): number;
}
