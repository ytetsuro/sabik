import { Calculator } from '../Calculator';
import { ComplexityCountableNode } from '../../../TestHelpers/ComplexityCountableNode';
import { HalsteadLength } from '../../Halstead/MetricsValue/HalsteadLength';
import { HalsteadVocabulary } from '../..//Halstead/MetricsValue/HalsteadVocabulary';
import { HalsteadVolume } from '../..//Halstead/MetricsValue/HalsteadVolume';
import { OperandAndOperator } from "../..//Halstead/OperandAndOperator";
import { CognitiveComplexity } from '../../CognitiveComplexity/CognitiveComplexity';
import { ComplexityIncrement } from '../../CognitiveComplexity/ComplexityIncrement';
import { LogicalLineOfCode } from '../../LineOfCode/MetricsValue/LogicalLineOfCode';

describe('Maintainability Calculator Class', () => {
  describe('Maintainability Index = MAX(0,(171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cognitive Complexity) - 16.2 * ln(Lines of Code))*100 / 171)', () => {
    it('should maintainability is 81.02887883601011 when Halstead Volume is 14 and Cognitive Complexity is 4 and Logical line of code is 3.', () => {
      const analyzer = new Calculator();
      const operandAndOperator = new OperandAndOperator(
        new Map([
          ['dummy', 1],
          ['dummy2', 2],
        ]),
        new Map([
          ['&&', 1],
          ['||', 3],
        ])
      );
      const volume = new HalsteadVolume(
          new HalsteadLength(operandAndOperator),
          new HalsteadVocabulary(operandAndOperator)
      );
      const complexity = new CognitiveComplexity([
        new ComplexityIncrement(new ComplexityCountableNode({ DSL: 'IN' }), 2),
        new ComplexityIncrement(new ComplexityCountableNode({ DSL: 'I' }), 2),
      ]);
      const lineOfCode = new LogicalLineOfCode(3);

      const actual = analyzer.calculate([volume, complexity, lineOfCode]);

      expect(Number(actual[0])).toBe(91.45659057778633);
    });
  });
});
