export interface HalsteadCountableNode {
    isOperand(): boolean;
    isOperator(): boolean;
    getChildren(): HalsteadCountableNode[];
    getText(): string;
}
