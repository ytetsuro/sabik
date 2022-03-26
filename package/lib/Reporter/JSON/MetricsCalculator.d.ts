import { CodePointType } from '../../Analyzer/Metrics/CodePointType';
import { Metrics } from '../../Analyzer/Metrics/Metrics';
import { MetricsValue, MetricsValueConstructor } from '../../Analyzer/Metrics/MetricsValue';
export declare class MetricsCalculator {
    private readonly metrics;
    constructor(metrics: ReadonlyArray<Metrics>);
    filter(minimalCodePointType: CodePointType): MetricsCalculator;
    filter(callback: (metrics: Metrics) => boolean): MetricsCalculator;
    sum<T extends MetricsValue>(metricsValueConstructor: MetricsValueConstructor<T>): number;
    average<T extends MetricsValue>(metricsValueConstructor: MetricsValueConstructor<T>): number;
    max<T extends MetricsValue>(identity: MetricsValueConstructor<T>): Metrics;
    min<T extends MetricsValue>(identity: MetricsValueConstructor<T>): Metrics;
}
