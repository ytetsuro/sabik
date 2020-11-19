import { Halstead } from '../../Halstead/Halstead';
import { OperandAndOperator } from '../../Halstead/OperandAndOperator';
import { ComplexityStore } from '../../CongnitiveComplexity/ComplexityStore';
import { Complexity } from '../../CongnitiveComplexity/Complexity';
import { LineOfCode } from '../../LineOfCode/LineOfCode';
import { Calculator } from '../Calculator';
import { ComplexityCountableNode } from '../../../TestHelpers/ComplexityCountableNode';

describe('Maintainability Calculator Class', () => {
  describe('Maintainability Index = MAX(0,(171 - 5.2 * ln(Halstead Volume) - 0.23 * (Congnitive Complexity) - 16.2 * ln(Lines of Code))*100 / 171)', () => {
    it('should maintainability is 81.02887883601011 when Halstead Volume is 14 and Congnitive Complexity is 4 and Logical line of code is 3.', () => {
      const calculator = new Calculator();
      const halstead = new Halstead(
        new OperandAndOperator(
          new Map([
            ['dummy', 1],
            ['dummy2', 2],
          ]),
          new Map([
            ['&&', 1],
            ['||', 3],
          ])
        )
      );
      const complexity = new ComplexityStore([
        new Complexity(new ComplexityCountableNode({ DSL: 'IN' }), 2),
        new Complexity(new ComplexityCountableNode({ DSL: 'I' }), 2),
      ]);
      const lineOfCode = new LineOfCode(5, 3);

      const actual = calculator.calculate({
        complexity,
        halstead,
        lineOfCode,
      });

      expect(actual.valueOf()).toBe(81.02887883601011);
    });
  });
});
