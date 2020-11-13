import { MetricsType } from './MetricsType';

export class MetricsValue {
    constructor(
        public readonly type: MetricsType,
        private readonly value: number
    ) {
    }

    getLevel() {
        return this.type.getLevel(Number(this));
    }

    valueOf() {
        return Math.round(this.value * Math.pow(10, 2)) / Math.pow(10, 2);
    }

    toString() {
        return Number(this).toLocaleString();
    }
}