import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { HalsteadDifficulty } from './HalsteadDifficulty';
import { HalsteadVolume } from './HalsteadVolume';
export declare class HalsteadEffort implements MetricsValue {
    private readonly volume;
    private readonly difficulty;
    readonly type: MetricsType;
    constructor(volume: HalsteadVolume, difficulty: HalsteadDifficulty);
    valueOf(): number;
}
