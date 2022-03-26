import { HalsteadCountableNode as HalsteadCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/Halstead/Adapter/HalsteadCountableNode';
import { ASTNode } from './ASTNode';
export declare class HalsteadCountableNode implements HalsteadCountableNodeInterface {
    private readonly node;
    private readonly pureNode;
    constructor(node: ASTNode);
    isOperand(): boolean;
    isOperator(): boolean;
    private isIdentifier;
    private isLiteral;
    private isToken;
    private isKeyword;
    private isBetweenKind;
    getText(): string;
    getChildren(): HalsteadCountableNode[];
}
