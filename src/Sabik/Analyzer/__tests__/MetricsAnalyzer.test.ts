import { Complexity } from '../../../Calculator/CognitiveComplexity/Complexity';
import { ComplexityStore } from '../../../Calculator/CognitiveComplexity/ComplexityStore';
import { Halstead } from '../../../Calculator/Halstead/Halstead';
import { OperandAndOperator } from '../../../Calculator/Halstead/OperandAndOperator';
import { LineOfCode } from '../../../Calculator/LineOfCode/LineOfCode';
import { Maintainability } from '../../../Calculator/Maintainability/Maintainability';
import { ASTNode } from '../../../TestHelpers/ASTNode';
import { ComplexityCountableNode } from '../../../TestHelpers/ComplexityCountableNode';
import { HalsteadCountableNode } from '../../../TestHelpers/HalsteadCountableNode';
import { MetricsAnalyzer } from '../MetricsAnalyzer';

describe('MetricsAnalyzer', () => {
  describe('.analyze()', () => {
    const analyzer = new MetricsAnalyzer(
      {
        convert: (_) =>
          new ComplexityCountableNode({
            DSL: 'IN',
            childs: [{ DSL: 'I' }, { DSL: '' }],
          }),
      },
      {
        convert: (_) =>
          new HalsteadCountableNode({
            DSL: 'T',
            text: '+',
            childs: [
              { DSL: 'N', text: '1' },
              { DSL: '', text: 'dummy' },
            ],
          }),
      },
      {
        convert: (_) => ({
          getText: () => `1
                    2
                    // 3
                    4`,
          getRemovedCommentAndEmptyLineText: () => `1
                    2
                    4`,
        }),
      }
    );

    it('should returns metrics.', () => {
      const actual = analyzer.analyze(
        new ASTNode(':root:0:0', {
          'F:dummyFauxMethod1:1:9': {},
        })
      );

      expect(actual).toStrictEqual({
        cognitiveComplexity: new ComplexityStore([
          new Complexity(new ComplexityCountableNode({ DSL: 'IN' }), 0),
          new Complexity(new ComplexityCountableNode({ DSL: 'I' }), 1),
        ]),
        halstead: new Halstead(
          new OperandAndOperator(new Map([['1', 1]]), new Map([['+', 1]]))
        ),
        lineOfCode: new LineOfCode(4, 3),
        maintainability: new Maintainability(87.21527227173385),
      });
    });
  });
});
