import { HalsteadBugsDelivered } from '../../MetricsValue/HalsteadBugsDelivered';
import { HalsteadVolume } from '../../MetricsValue/HalsteadVolume';
import { HalsteadLength } from '../../MetricsValue/HalsteadLength';
import { HalsteadVocabulary } from '../../MetricsValue/HalsteadVocabulary';
import { OperandAndOperator } from '../../OperandAndOperator';

describe('should getBugsDelivered method return is volume / 3000.', () => {
  it('should return 0.001584962500721156 when volume is 4.754887502163468.', () => {
    const operandAndOperator = new OperandAndOperator(
      new Map([
        ['dummy1', 1],
        ['dummy2', 1],
      ]),
      new Map([['dummy', 1]])
    );
    const volume = new HalsteadVolume(
      new HalsteadLength(operandAndOperator),
      new HalsteadVocabulary(operandAndOperator)
    );
    const halstead = new HalsteadBugsDelivered(volume);

    expect(Number(halstead)).toBe(0.001584962500721156);
  });
});
