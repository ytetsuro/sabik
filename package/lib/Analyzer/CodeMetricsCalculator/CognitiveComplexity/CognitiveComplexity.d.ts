import { MetricsType } from '../../Metrics/MetricsType';
import { MetricsValue } from '../../Metrics/MetricsValue';
import { ComplexityIncrement } from './ComplexityIncrement';
export declare class CognitiveComplexity implements MetricsValue {
    private readonly complexities;
    readonly type: MetricsType;
    constructor(complexities: ComplexityIncrement[]);
    valueOf(): number;
}
