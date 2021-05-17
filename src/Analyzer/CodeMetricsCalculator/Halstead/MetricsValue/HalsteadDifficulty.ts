import { Decimal } from 'decimal.js';
import { MetricsType } from '../../../Metrics/MetricsType';
import { MetricsValue } from '../../../Metrics/MetricsValue';
import { OperandAndOperator } from '../OperandAndOperator';

export class HalsteadDifficulty implements MetricsValue {
  public readonly type = MetricsType.HalsteadDifficulty;

  constructor(private readonly operandAndOperator: OperandAndOperator) {}

  valueOf() {
    const uniqueOperatorCount = new Decimal(
      this.operandAndOperator.getUniqueOperatorCount()
    );
    const totalOperatorCount = new Decimal(
      this.operandAndOperator.getTotalOperatorCount()
    );
    const uniqueOperandCount = new Decimal(
      this.operandAndOperator.getUniqueOperandCount()
    );

    return uniqueOperatorCount
      .div(2)
      .mul(totalOperatorCount.div(uniqueOperandCount))
      .toNumber();
  }
}
