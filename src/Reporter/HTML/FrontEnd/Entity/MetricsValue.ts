import { MetricsType } from './MetricsType';

export class MetricsValue {
    constructor(
        public readonly type: MetricsType,
        private readonly value: number|null
    ) {
    }

    isEmpty() {
      return this.value === null;
    }

    getLevel() {
        return this.isEmpty() ? 0 : this.type.getLevel(Number(this));
    }

    valueOf() {
        return this.isEmpty() ? 0 : Math.round(<number>this.value * Math.pow(10, 2)) / Math.pow(10, 2);
    }

    toString() {
        return this.isEmpty() ? '−' : Number(this).toLocaleString();
    }
}
