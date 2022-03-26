import { LineOfCodeCountableNode } from './Adapter/LineOfCodeCountableNode';
import { LogicalLineOfCode } from './MetricsValue/LogicalLineOfCode';
import { PhysicalLineOfCode } from './MetricsValue/PhysicalLineOfCode';
import { Metrics } from '../../Metrics/Metrics';
import { ASTNodeSource } from '../../FromASTNode/ASTNodeSource';
import { Analyzer } from '../../FromASTNode/Analyzer';
import { Converter } from '../../Adapter/Converter';
export declare class Calculator {
    private readonly analyzers;
    private readonly converter;
    constructor(analyzers: Analyzer[], converter: Converter<LineOfCodeCountableNode>);
    analyze(astNodes: ASTNodeSource[]): Metrics[];
    calculate(node: LineOfCodeCountableNode): (LogicalLineOfCode | PhysicalLineOfCode)[];
    private getAllLine;
}
