import { ComplexityCountableNode } from './Adapter/ComplexityCountableNode';
import { CognitiveComplexity } from './CognitiveComplexity';
import { CalculatorForAST } from '../../FromASTNode/CalculatorForAST';
import { MethodAnalyzer } from '../../FromASTNode/MethodAnalyzer';
import { Metrics } from '../../Metrics/Metrics';
import { ASTNodeSource } from '../../FromASTNode/ASTNodeSource';
import { Converter } from '../../Adapter/Converter';
export declare class Calculator implements CalculatorForAST {
    private readonly analyzer;
    private readonly converter;
    constructor(analyzer: MethodAnalyzer, converter: Converter<ComplexityCountableNode>);
    analyze(astNodes: ASTNodeSource[]): Metrics[];
    calculate(node: ComplexityCountableNode): CognitiveComplexity[];
    private extractComplexity;
}
