import { MetricsType } from './MetricsType';
export interface MetricsValue {
    readonly type: MetricsType;
    valueOf(): number;
}
export declare type MetricsValueConstructor<T extends MetricsValue = MetricsValue> = new (..._: any) => T;
