import { HalsteadCountableNode } from './Adapter/HalsteadCountableNode';
import { HalsteadBugsDelivered } from './MetricsValue/HalsteadBugsDelivered';
import { HalsteadDifficulty } from './MetricsValue/HalsteadDifficulty';
import { HalsteadEffort } from './MetricsValue/HalsteadEffort';
import { HalsteadLength } from './MetricsValue/HalsteadLength';
import { HalsteadTime } from './MetricsValue/HalsteadTime';
import { HalsteadVocabulary } from './MetricsValue/HalsteadVocabulary';
import { HalsteadVolume } from './MetricsValue/HalsteadVolume';
import { MethodAnalyzer } from '../../FromASTNode/MethodAnalyzer';
import { Metrics } from '../../Metrics/Metrics';
import { ASTNodeSource } from '../../FromASTNode/ASTNodeSource';
import { Converter } from '../../Adapter/Converter';
export declare class Calculator {
    private readonly analyzer;
    private readonly converter;
    constructor(analyzer: MethodAnalyzer, converter: Converter<HalsteadCountableNode>);
    analyze(astNodes: ASTNodeSource[]): Metrics[];
    calculate(node: HalsteadCountableNode): (HalsteadLength | HalsteadVocabulary | HalsteadVolume | HalsteadBugsDelivered | HalsteadDifficulty | HalsteadEffort | HalsteadTime)[];
    private extractOperandsAndOperators;
    private add;
}
