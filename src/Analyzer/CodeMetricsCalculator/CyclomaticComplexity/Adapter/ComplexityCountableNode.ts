export interface ComplexityCountableNode {
  isIncrement(): boolean;
  getChildren(): ComplexityCountableNode[];
}
