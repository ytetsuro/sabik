import { Calculator } from '../Calculator';
import { ComplexityCountableNode } from '../../../../TestHelpers/ComplexityCountableNode';
import { HalsteadLength } from '../../Halstead/MetricsValue/HalsteadLength';
import { HalsteadVocabulary } from '../../Halstead/MetricsValue/HalsteadVocabulary';
import { HalsteadVolume } from '../../Halstead/MetricsValue/HalsteadVolume';
import { OperandAndOperator } from '../../Halstead/OperandAndOperator';
import { ComplexityIncrement } from '../../CyclomaticComplexity/ComplexityIncrement';
import { LogicalLineOfCode } from '../../LineOfCode/MetricsValue/LogicalLineOfCode';
import { Metrics } from '../../../Metrics/Metrics';
import { Maintainability } from '../Maintainability';
import { CodePoint } from '../../../Metrics/CodePoint';
import { CodePointType } from '../../../Metrics/CodePointType';
import { CyclomaticComplexity } from '../../CyclomaticComplexity/CyclomaticComplexity';

describe('Maintainability Calculator Class', () => {
  describe('Maintainability Index = MAX(0,(171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(Lines of Code))*100 / 171)', () => {
    it('should maintainability is 81.02887883601011 when Halstead Volume is 14 and Cyclomatic Complexity is 4 and Logical line of code is 3.', () => {
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
      const complexity = new CyclomaticComplexity([
        new ComplexityIncrement(new ComplexityCountableNode({ DSL: 'I' })),
        new ComplexityIncrement(new ComplexityCountableNode({ DSL: 'I' })),
        new ComplexityIncrement(new ComplexityCountableNode({ DSL: 'I' })),
      ]);
      const lineOfCode = new LogicalLineOfCode(3);

      const actual = analyzer.analyze([
        new Metrics(
          {
            fullPath: '',
            relativePath: '',
            extension: '',
          },
          [new CodePoint(CodePointType.Method, 'Dummy', 2, 5)],
          [volume, complexity, lineOfCode]
        ),
      ]);

      expect(Number(actual[0].getMetricsByMetricsValue(Maintainability))).toBe(91.45659057778633);
    });
  });
});
