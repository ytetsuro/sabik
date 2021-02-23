import { MetricsType } from '../../MetricsType';
import { MetricsValue } from '../../MetricsValue';
import { OperandAndOperator } from '../OperandAndOperator';

export class HalsteadVocabulary implements MetricsValue{
    public readonly type = MetricsType.HalsteadVocabulary;
  constructor(private readonly operandAndOperator: OperandAndOperator) {}

  valueOf() {
    return this.operandAndOperator.getUniqueOperandCount() + this.operandAndOperator.getUniqueOperatorCount()
  }
}