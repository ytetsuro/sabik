import { File } from './Adapter/File';
import { CalculatorForAST } from './FromASTNode/CalculatorForAST';
import { Metrics } from './Metrics/Metrics';
import { CalculatorForMetrics } from './FromOtherMetrics/CalculatorForMetrics';
import { ASTGenerator } from './Adapter/ASTGenerator';
export declare class Analyzer {
    private readonly astNodeGenerator;
    private readonly calculatorForAST;
    private readonly calculatorForMetrics;
    private readonly metricsMap;
    constructor(astNodeGenerator: ASTGenerator, calculatorForAST: CalculatorForAST[], calculatorForMetrics: CalculatorForMetrics[]);
    analyze(files: File[]): Metrics[];
    private metricsAnalyze;
    private astAnalyze;
    private setMetricsList;
}
