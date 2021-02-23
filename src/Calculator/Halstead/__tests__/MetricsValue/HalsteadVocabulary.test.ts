import { HalsteadVocabulary } from '../../MetricsValue/HalsteadVocabulary';
import { OperandAndOperator } from '../../OperandAndOperator';

describe('should HalsteadVocabulary is operand and operator vocabulary.', () => {
  it('should return 1 when one vocabulary 2 operator.', () => {
    const halstead = new HalsteadVocabulary(
      new OperandAndOperator(new Map(), new Map([['dummy', 2]]))
    );

    expect(Number(halstead)).toBe(1);
  });

  it('should return 1 when one vocabulary 2 operand.', () => {
    const halstead = new HalsteadVocabulary(
      new OperandAndOperator(new Map([['dummy', 2]]), new Map())
    );

    expect(Number(halstead)).toBe(1);
  });

  it('should return 3 when two vocabulary operator, and one vocabulary operand.', () => {
    const halstead = new HalsteadVocabulary(
      new OperandAndOperator(
        new Map([
          ['dummy', 1],
          ['dummy2', 1],
        ]),
        new Map([['dummy', 2]])
      )
    );

    expect(Number(halstead)).toBe(3);
  });
});
