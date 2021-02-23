import { HalsteadEffort } from '../../MetricsValue/HalsteadEffort';
import { HalsteadVolume } from '../../MetricsValue/HalsteadVolume';
import { HalsteadLength } from '../../MetricsValue/HalsteadLength';
import { HalsteadVocabulary } from '../../MetricsValue/HalsteadVocabulary';
import { OperandAndOperator } from "../../OperandAndOperator";
import { HalsteadDifficulty } from '../../MetricsValue/HalsteadDifficulty';
import { HalsteadTime } from '../../MetricsValue/HalsteadTime';


  describe('should getTime method return is effort / 18.', () => {
    it('should return 0.11006684032785807 when effort is 1.981203125901445.', () => {
      const operandAndOperator = new OperandAndOperator(
          new Map([
          ['dummy1', 2],
          ['dummy2', 2],
          ]),
          new Map([['dummy', 1]])
      );
      const volume = new HalsteadVolume(
          new HalsteadLength(operandAndOperator),
          new HalsteadVocabulary(operandAndOperator),
      );
      const difficulty = new HalsteadDifficulty(operandAndOperator);
      const effort = new HalsteadEffort(volume, difficulty);
      const halstead = new HalsteadTime(effort);

      expect(Number(halstead)).toBe(0.11006684032785807);
    });
  });