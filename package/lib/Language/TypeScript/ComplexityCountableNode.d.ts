import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/CognitiveComplexity/Adapter/ComplexityCountableNode';
import { ASTNode } from './ASTNode';
export declare class ComplexityCountableNode implements ComplexityCountableNodeInterface {
    private static readonly nestLevelUpKinds;
    private static readonly nestingIncrementSyntaxKinds;
    private static readonly incrementSyntaxKinds;
    private readonly node;
    private readonly pureNode;
    constructor(node: ASTNode);
    isNestLevelUp(): boolean;
    isIncrement(): boolean;
    isNestingIncrement(): boolean;
    private isElse;
    getChildren(): ComplexityCountableNode[];
}
