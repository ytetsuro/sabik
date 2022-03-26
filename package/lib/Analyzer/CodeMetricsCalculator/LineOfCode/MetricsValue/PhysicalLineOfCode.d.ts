import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
export declare class PhysicalLineOfCode implements MetricsValue {
    private readonly lineOfCode;
    readonly type: MetricsType;
    constructor(lineOfCode: number);
    valueOf(): number;
}
