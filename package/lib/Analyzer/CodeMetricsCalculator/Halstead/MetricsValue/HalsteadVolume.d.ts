import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { HalsteadLength } from './HalsteadLength';
import { HalsteadVocabulary } from './HalsteadVocabulary';
export declare class HalsteadVolume implements MetricsValue {
    private readonly length;
    private readonly vocabulary;
    readonly type: MetricsType;
    constructor(length: HalsteadLength, vocabulary: HalsteadVocabulary);
    valueOf(): number;
}
