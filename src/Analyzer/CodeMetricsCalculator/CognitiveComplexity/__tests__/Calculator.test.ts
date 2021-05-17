import { Calculator } from '../Calculator';
import { ComplexityCountableNode } from '../../../../TestHelpers/ComplexityCountableNode';
import { MethodAnalyzer } from '../../../FromASTNode/MethodAnalyzer';
import { ASTNodeExtractor } from '../../../ASTNodeExtractor';
import { ASTNode } from '../../../../TestHelpers/ASTNode';
import { CognitiveComplexity } from '../CognitiveComplexity';

describe('Cognitive Complexity Calculator', () => {
  describe('should increment when incrementable node.', () => {
    const createCountableNodeSeed: (ast: ASTNode) => any = (ast: ASTNode) => ({
      DSL: ast.getName(),
      children: ast.getChildren().map((ast) => createCountableNodeSeed(ast)),
    });
    const calculator = new Calculator(
      new MethodAnalyzer(new ASTNodeExtractor()),
      {
        convert: (ast: ASTNode) =>
          new ComplexityCountableNode(createCountableNodeSeed(ast)),
      }
    );

    it('should returns 1 when incrementable node.', () => {
      const actual = calculator.analyze([
        {
          astNode: new ASTNode(':root:0:0', {
            'C:DummyClass:0:20': {
              'M:I:1:9': {},
            },
          }),
          file: {
            fullPath: '/tmp/dummy.ts',
            relativePath: 'dummy.ts',
            extension: 'ts',
          },
        },
      ]);

      expect(
        Number(actual[0].getMetricsByMetricsValue(CognitiveComplexity))
      ).toBe(1);
    });

    it('should returns 1 when childNode is incrementable node.', () => {
      const actual = calculator.analyze([
        {
          astNode: new ASTNode(':root:0:0', {
            'C:DummyClass:0:20': {
              'M::1:9': {
                ':I:2:3': {},
              },
            },
          }),
          file: {
            fullPath: '/tmp/dummy.ts',
            relativePath: 'dummy.ts',
            extension: 'ts',
          },
        },
      ]);

      expect(
        Number(actual[0].getMetricsByMetricsValue(CognitiveComplexity))
      ).toBe(1);
    });

    it('should return 1 when incrementable node in nest level up node.', () => {
      const actual = calculator.analyze([
        {
          astNode: new ASTNode(':root:0:0', {
            'C:DummyClass:0:20': {
              'M:N:1:9': {
                ':I:2:3': {},
              },
            },
          }),
          file: {
            fullPath: '/tmp/dummy.ts',
            relativePath: 'dummy.ts',
            extension: 'ts',
          },
        },
      ]);

      expect(
        Number(actual[0].getMetricsByMetricsValue(CognitiveComplexity))
      ).toBe(1);
    });

    it('should return 2 when net incrementable node in nest level up node.', () => {
      const actual = calculator.analyze([
        {
          astNode: new ASTNode(':root:0:0', {
            'C:DummyClass:0:20': {
              'M:N:1:9': {
                ':IN:2:3': {},
              },
            },
          }),
          file: {
            fullPath: '/tmp/dummy.ts',
            relativePath: 'dummy.ts',
            extension: 'ts',
          },
        },
      ]);

      expect(
        Number(actual[0].getMetricsByMetricsValue(CognitiveComplexity))
      ).toBe(2);
    });
  });
});
