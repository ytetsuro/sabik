import { HalsteadDifficulty } from '../../MetricsValue/HalsteadDifficulty';
import { OperandAndOperator } from "../../OperandAndOperator";

  describe('should HalsteadDifficulty is (operators vocabulary / 2) * (operands vocabulary / operands length).', () => {
    it('should return 0.25 when operands has two vocabulary 4 length, and operator has one vocabulary 1 length.', () => {
      const halstead = new HalsteadDifficulty(
        new OperandAndOperator(
          new Map([
            ['dummy1', 2],
            ['dummy2', 2],
          ]),
          new Map([['dummy', 1]])
        )
      );

      expect(Number(halstead)).toBe(0.25);
    });
  });