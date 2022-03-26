export interface ComplexityCountableNode {
    isIncrement(): boolean;
    isNestLevelUp(): boolean;
    isNestingIncrement(): boolean;
    getChildren(): ComplexityCountableNode[];
}
