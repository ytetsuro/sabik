import { HalsteadVolume } from '../Halstead/MetricsValue/HalsteadVolume';
import { CognitiveComplexity } from '../CognitiveComplexity/CognitiveComplexity';
import { LogicalLineOfCode } from '../LineOfCode/MetricsValue/LogicalLineOfCode';
import { MetricsValue } from '../../Metrics/MetricsValue';
import { Metrics } from '../../Metrics/Metrics';
export declare class Calculator {
    readonly targetMetrics: (typeof CognitiveComplexity | typeof HalsteadVolume | typeof LogicalLineOfCode)[];
    analyze(metricsList: Metrics[]): Metrics[];
    calculate(metricsList: MetricsValue[]): MetricsValue[];
}
