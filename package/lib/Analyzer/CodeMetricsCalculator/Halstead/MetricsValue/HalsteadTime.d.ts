import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { HalsteadEffort } from './HalsteadEffort';
export declare class HalsteadTime implements MetricsValue {
    private readonly effort;
    readonly type: MetricsType;
    constructor(effort: HalsteadEffort);
    valueOf(): number;
}
