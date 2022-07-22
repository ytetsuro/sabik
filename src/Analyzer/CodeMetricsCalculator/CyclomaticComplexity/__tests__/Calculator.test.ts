import { Calculator } from '../Calculator';
import { ComplexityCountableNode } from '../../../../TestHelpers/ComplexityCountableNode';
import { MethodAnalyzer } from '../../../FromASTNode/MethodAnalyzer';
import { ASTNodeExtractor } from '../../../ASTNodeExtractor';
import { ASTNode } from '../../../../TestHelpers/ASTNode';
import { CyclomaticComplexity } from '../CyclomaticComplexity';

describe('Cyclomatic Complexity Calculator', () => {
  describe('should increment when incrementable node.', () => {
    const createCountableNodeSeed: (ast: ASTNode) => any = (ast: ASTNode) => ({
      DSL: ast.getName(),
      children: ast.getChildren().map((ast) => createCountableNodeSeed(ast)),
    });
    const calculator = new Calculator(new MethodAnalyzer(new ASTNodeExtractor()), {
      convert: (ast: ASTNode) => new ComplexityCountableNode(createCountableNodeSeed(ast)),
    });

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

      expect(Number(actual[0].getMetricsByMetricsValue(CyclomaticComplexity))).toBe(1);
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

      expect(Number(actual[0].getMetricsByMetricsValue(CyclomaticComplexity))).toBe(1);
    });

    it('should return 2 when has tow incrementable node.', () => {
      const actual = calculator.analyze([
        {
          astNode: new ASTNode(':root:0:0', {
            'C:DummyClass:0:20': {
              'M:N:1:9': {
                ':I:2:3': {},
                ':I:4:5': {},
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

      expect(Number(actual[0].getMetricsByMetricsValue(CyclomaticComplexity))).toBe(2);
    });
  });
});
