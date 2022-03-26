import { CodePoint } from './CodePoint';
import { MetricsValue, MetricsValueConstructor } from './MetricsValue';
import { File } from '../Adapter/File';
export declare class Metrics {
    readonly file: File;
    readonly codePoints: ReadonlyArray<CodePoint>;
    readonly metricsValues: ReadonlyArray<MetricsValue>;
    constructor(file: File, codePoints: ReadonlyArray<CodePoint>, metricsValues: ReadonlyArray<MetricsValue>);
    hasMetricsValue(...values: MetricsValueConstructor[]): boolean;
    getMetricsByMetricsValue<T extends MetricsValue>(constructor: MetricsValueConstructor<T>): T | null;
    merge(metrics: Metrics): Metrics;
    getMinimalCodePoint(): CodePoint;
    getName(): string;
    toJSON(): {
        fileName: string;
        name: string;
        codePointType: number;
        startLineNumber: number;
        endLineNumber: number;
        metricsList: {
            type: number;
            typeLabel: string;
            value: number;
        }[];
    };
}
