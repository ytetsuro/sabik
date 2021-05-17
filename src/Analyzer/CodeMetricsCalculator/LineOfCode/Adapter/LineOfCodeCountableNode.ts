export interface LineOfCodeCountableNode {
  getText(): string;
  getRemovedCommentAndEmptyLineText(): string;
}
