export interface HalsteadCountableNode {
  isOperand(): boolean;
  isOperator(): boolean;
  getChilds(): HalsteadCountableNode[];
  getText(): string;
}
