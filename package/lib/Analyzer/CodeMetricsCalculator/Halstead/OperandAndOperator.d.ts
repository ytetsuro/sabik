export declare class OperandAndOperator {
    readonly operands: Map<string, number>;
    readonly operators: Map<string, number>;
    constructor(operands: Map<string, number>, operators: Map<string, number>);
    getUniqueOperatorCount(): number;
    getUniqueOperandCount(): number;
    getTotalOperatorCount(): number;
    getTotalOperandCount(): number;
}
