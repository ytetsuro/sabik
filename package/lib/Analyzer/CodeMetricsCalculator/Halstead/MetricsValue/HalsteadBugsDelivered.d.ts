import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { HalsteadVolume } from './HalsteadVolume';
export declare class HalsteadBugsDelivered implements MetricsValue {
    private readonly volume;
    readonly type: MetricsType;
    constructor(volume: HalsteadVolume);
    valueOf(): number;
}
