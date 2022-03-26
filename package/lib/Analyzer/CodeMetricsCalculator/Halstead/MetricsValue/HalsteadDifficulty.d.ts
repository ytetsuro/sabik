import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { OperandAndOperator } from '../OperandAndOperator';
export declare class HalsteadDifficulty implements MetricsValue {
    private readonly operandAndOperator;
    readonly type: MetricsType;
    constructor(operandAndOperator: OperandAndOperator);
    valueOf(): number;
}
