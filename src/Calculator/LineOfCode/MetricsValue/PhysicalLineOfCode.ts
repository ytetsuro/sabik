import { MetricsType } from '../../MetricsType';
import { MetricsValue } from '../../MetricsValue';

export class PhysicalLineOfCode implements MetricsValue {
    public readonly type = MetricsType.PhysicalLineOfCode;

    constructor(private readonly lineOfCode: number) {}

    valueOf() {
        return this.lineOfCode;
    }
}