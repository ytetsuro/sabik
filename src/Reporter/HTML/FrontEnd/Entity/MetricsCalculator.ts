import { Metrics } from './Metrics';
import { MetricsType } from './MetricsType';
import { MetricsValue } from './MetricsValue';

export class MetricsCalculator {
    constructor(private readonly metrics: Metrics[]) {}

    sum(findType: MetricsType) {
        const value = this.findAllByType(findType)
            .reduce((sum, value) => sum + value.valueOf(), 0);

        return new MetricsValue(findType, value);
    }

    getLength() {
        return this.metrics.length;
    }

    average(findType: MetricsType) {
        const length = this.getLength();
        const sum = this.sum(findType);

        return new MetricsValue(findType, sum.valueOf() ? sum.valueOf() / length : 0);
    }

    max(findType: MetricsType) {
        const values = new Set(
            this.findAllByType(findType)
         );

        return new MetricsValue(findType, Math.max(...values, 0));
    }

    min(findType: MetricsType) {
        const values = new Set(
            this.findAllByType(findType)
        );

        return new MetricsValue(findType, Math.min(...values, Infinity));
    }

    private findAllByType(findType: MetricsType) {
        return this.metrics
            .map((row) => row.getByType(findType)!)
            .filter((row) => row && !row.isEmpty())
            .map(row => Number(row));
    }
}
