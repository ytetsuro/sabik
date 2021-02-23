import { MetricsType } from '../../MetricsType';
import { MetricsValue } from '../../MetricsValue';
import { OperandAndOperator } from '../OperandAndOperator';

export class HalsteadLength implements MetricsValue {
  public readonly type = MetricsType.HalsteadLength;

  constructor(private readonly operandAndOperator: OperandAndOperator) {}

  valueOf() {
    return (
      this.operandAndOperator.getTotalOperandCount() +
      this.operandAndOperator.getTotalOperatorCount()
    );
  }
}
