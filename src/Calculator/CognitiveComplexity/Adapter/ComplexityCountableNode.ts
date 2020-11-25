export interface ComplexityCountableNode {
  isIncrement(): boolean;
  isNestLevelUp(): boolean;
  isNestingIncrement(): boolean;
  getChilds(): ComplexityCountableNode[];
}
