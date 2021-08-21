import { HalsteadLength } from '../../MetricsValue/HalsteadLength';
import { OperandAndOperator } from '../../OperandAndOperator';

describe('should HalsteadLength is operand and operator length.', () => {
  it('should return 2 when one vocabulary 2 operator.', () => {
    const halstead = new HalsteadLength(new OperandAndOperator(new Map(), new Map([['dummy', 2]])));

    expect(Number(halstead)).toBe(2);
  });

  it('should return 2 when one vocabulary 2 operand.', () => {
    const halstead = new HalsteadLength(new OperandAndOperator(new Map([['dummy', 2]]), new Map()));

    expect(Number(halstead)).toBe(2);
  });

  it('should return 3 when one vocabulary 2 operator, and one vocabulary 1 operand.', () => {
    const halstead = new HalsteadLength(new OperandAndOperator(new Map([['dummy', 1]]), new Map([['dummy', 2]])));

    expect(Number(halstead)).toBe(3);
  });
});
