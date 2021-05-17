import { HalsteadEffort } from '../../MetricsValue/HalsteadEffort';
import { HalsteadVolume } from '../../MetricsValue/HalsteadVolume';
import { HalsteadLength } from '../../MetricsValue/HalsteadLength';
import { HalsteadVocabulary } from '../../MetricsValue/HalsteadVocabulary';
import { OperandAndOperator } from '../../OperandAndOperator';
import { HalsteadDifficulty } from '../../MetricsValue/HalsteadDifficulty';

describe('should HalsteadEffort is difficulty * volume.', () => {
  it('should return 1.9812031259014453 when volume is 7.92481250360578 and difficulty is 0.25.', () => {
    const operandAndOperator = new OperandAndOperator(
      new Map([
        ['dummy1', 2],
        ['dummy2', 2],
      ]),
      new Map([['dummy', 1]])
    );
    const volume = new HalsteadVolume(
      new HalsteadLength(operandAndOperator),
      new HalsteadVocabulary(operandAndOperator)
    );
    const difficulty = new HalsteadDifficulty(operandAndOperator);
    const halstead = new HalsteadEffort(volume, difficulty);

    expect(Number(halstead)).toBe(1.9812031259014453);
  });
});
