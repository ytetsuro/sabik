import { CodePoint } from './CodePoint';
import { MetricsType } from '../Adapter/MetricsType';
import { MetricsValue } from '../Adapter/MetricsValue';
import { File } from '../Adapter/File';

type MetricsValueConstructor<T extends MetricsValue> = new (..._: any) => T;

export class Metrics {
    constructor(
        public readonly file: File,
        public readonly codePoints: CodePoint[],
        private readonly metricsValues: MetricsValue[],
    ){}

    hasMetricsValue(...values: MetricsValueConstructor<MetricsValue>[]): boolean{
        return values.every(constructor => this.getMetricsByMetricsValue(constructor) !== null);
    }

    getMetricsByMetricsValue<T extends MetricsValue>(constructor: MetricsValueConstructor<T>): T | null {
        return <T|null>this.metricsValues
            .find((metricsValue) => (metricsValue instanceof constructor)) ?? null;
    }

    merge(metrics: Metrics) {
        return new Metrics(this.file, this.codePoints, [...metrics.metricsValues, ...this.metricsValues]);
    }

    getMinimalCodePoint() {
        return this.codePoints
            .reduce((current, row) => (current?.type?.isMoreDetail?.(row.type) ?? false) ? row : current);
    }

    private getName() {
        return this.codePoints
        .sort((a, b) => Number(a.type) - Number(b.type))
        .map(({name}) => name)
        .join('.');
    }

    toJSON() {
        const minimalCodePoint = this.getMinimalCodePoint();

        return {
            fileName: this.file.relativePath,
            name: this.getName(),
            codePointType: Number(minimalCodePoint.type),
            startLineNumber: minimalCodePoint.startLineNumber,
            endLineNumber: minimalCodePoint.endLineNumber,
            metricsList: this.metricsValues.map(metrics => ({
                type: Number(metrics.type),
                value: Number(metrics)
            })),
        };
    }
}