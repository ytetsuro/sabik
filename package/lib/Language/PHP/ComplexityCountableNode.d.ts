import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/CognitiveComplexity/Adapter/ComplexityCountableNode';
import { ASTNode } from './ASTNode';
export declare class ComplexityCountableNode implements ComplexityCountableNodeInterface {
    private static readonly nestLevelUpKinds;
    private static readonly nestingIncrementSyntaxKinds;
    private readonly node;
    constructor(node: ASTNode);
    isNestLevelUp(): boolean;
    isIncrement(): boolean;
    isNestingIncrement(): boolean;
    private isElse;
    getChildren(): ComplexityCountableNode[];
}
