import { HalsteadCountableNode as HalsteadCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/Halstead/Adapter/HalsteadCountableNode';
import { ASTNode } from './ASTNode';
declare type Token = {
    token: string;
    source: string;
};
export declare class HalsteadCountableNode implements HalsteadCountableNodeInterface {
    private readonly token;
    private readonly tokenChildren;
    private static readonly operands;
    private static readonly operators;
    private static readonly operatorStrings;
    constructor(nodeOrToken: ASTNode | Token);
    isOperand(): boolean;
    isOperator(): boolean;
    getText(): string;
    getChildren(): HalsteadCountableNode[];
    private getTokens;
}
export {};
