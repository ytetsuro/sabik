import { HalsteadLength } from '../../MetricsValue/HalsteadLength';
import { HalsteadVocabulary } from '../../MetricsValue/HalsteadVocabulary';
import { HalsteadVolume } from '../../MetricsValue/HalsteadVolume';
import { OperandAndOperator } from '../../OperandAndOperator';

describe('should HalsteadVolume is length multiplied by log2 vocabulary.', () => {
  it('should return 4.754887502163468 when three vocabulary, 3 length.', () => {
    const operandAndOperator = new OperandAndOperator(
      new Map([
        ['dummy1', 1],
        ['dummy2', 1],
      ]),
      new Map([['dummy', 1]])
    );
    const halstead = new HalsteadVolume(
      new HalsteadLength(operandAndOperator),
      new HalsteadVocabulary(operandAndOperator)
    );

    expect(Number(halstead)).toBe(4.754887502163468);
  });
});
