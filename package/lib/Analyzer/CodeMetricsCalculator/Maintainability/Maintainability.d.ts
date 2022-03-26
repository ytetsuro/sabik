import { MetricsType } from '../../Metrics/MetricsType';
import { MetricsValue } from '../../Metrics/MetricsValue';
import { HalsteadVolume } from '../Halstead/MetricsValue/HalsteadVolume';
import { CognitiveComplexity } from '../CognitiveComplexity/CognitiveComplexity';
import { LogicalLineOfCode } from '../LineOfCode/MetricsValue/LogicalLineOfCode';
export declare class Maintainability implements MetricsValue {
    private readonly halsteadVolume;
    private readonly complexity;
    private readonly logicalLineOfCode;
    readonly type: MetricsType;
    constructor(halsteadVolume: HalsteadVolume, complexity: CognitiveComplexity, logicalLineOfCode: LogicalLineOfCode);
    valueOf(): number;
}
