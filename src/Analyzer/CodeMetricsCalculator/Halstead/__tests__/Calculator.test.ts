import { Calculator } from '../Calculator';
import { HalsteadCountableNode } from '../../../../TestHelpers/HalsteadCountableNode';
import { HalsteadLength } from '../MetricsValue/HalsteadLength';
import { HalsteadVocabulary } from '../MetricsValue/HalsteadVocabulary';
import { ASTNode } from '../../../../TestHelpers/ASTNode';
import { MethodAnalyzer } from '../../../FromASTNode/MethodAnalyzer';
import { ASTNodeExtractor } from '../../../ASTNodeExtractor';

describe('Halstead Calculator', () => {
  const createCountableNodeSeed: (ast: ASTNode) => any = (ast: ASTNode) => {
    const [DSL, text] = ast.getName().split('-', 2);

    return {
      DSL,
      text,
      children: ast.getChildren().map(ast => createCountableNodeSeed(ast))
    };
  };
  const calculator = new Calculator(
    new MethodAnalyzer(
      new ASTNodeExtractor(),
    ),
    {convert: (ast: ASTNode) => new HalsteadCountableNode(createCountableNodeSeed(ast))}
  );

  describe('should count operand.', () => {
    it('should length is 1 when operand node.', () => {
      const actual = calculator.analyze([{
        astNode: new ASTNode(':root:0:0', {
          'C:DummyClass:0:20': {
            'M:N-dummy:1:9': {},
          },
        }),
        file: {
          fullPath: '/tmp/dummy.ts',
          relativePath: 'dummy.ts',
          extension: 'ts',
        }
      }]);

      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadLength))).toBe(
        1
      );
    });

    it('should length is 1 when child node is operand node.', () => {
      const actual = calculator.analyze([{
        astNode: new ASTNode(':root:0:0', {
          'C:DummyClass:0:20': {
            'M:-Dummy:1:9': {
              ':N-Dummy:2:3': {}
            },
          },
        }),
        file: {
          fullPath: '/tmp/dummy.ts',
          relativePath: 'dummy.ts',
          extension: 'ts',
        }
      }]);

      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadLength))).toBe(
        1
      );
    });

    it('should length is 2, and vocabulary is 1 when parent node is `dummy` text operand, child node is `dummy` text operand.', () => {
      const actual = calculator.analyze([{
        astNode: new ASTNode(':root:0:0', {
          'C:DummyClass:0:20': {
            'M:N-dummy:1:9': {
              ':N-dummy:2:3': {}
            },
          },
        }),
        file: {
          fullPath: '/tmp/dummy.ts',
          relativePath: 'dummy.ts',
          extension: 'ts',
        }
      }]);

      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadLength))).toBe(
        2
      );
      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadVocabulary))).toBe(1);
    });
  });

  describe('should count operator', () => {
    it('should length is 1 when root node is operator node.', () => {
      const actual = calculator.analyze([{
        astNode: new ASTNode(':root:0:0', {
          'C:DummyClass:0:20': {
            'M:T-dummy:1:9': {},
          },
        }),
        file: {
          fullPath: '/tmp/dummy.ts',
          relativePath: 'dummy.ts',
          extension: 'ts',
        }
      }]);

      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadLength))).toBe(
        1
      );
    });

    it('should length is 1 when child node is operator node.', () => {
      const actual = calculator.analyze([{
        astNode: new ASTNode(':root:0:0', {
          'C:DummyClass:0:20': {
            'M:-Dummy:1:9': {
              ':T-Dummy:2:3': {}
            },
          },
        }),
        file: {
          fullPath: '/tmp/dummy.ts',
          relativePath: 'dummy.ts',
          extension: 'ts',
        }
      }]);

      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadLength))).toBe(
        1
      );
    });

    it('should length is 2, and vocabulary is 1 when parent node is `dummy` text operator, child node is `dummy` text operator.', () => {
      const actual = calculator.analyze([{
        astNode: new ASTNode(':root:0:0', {
          'C:DummyClass:0:20': {
            'M:T-dummy:1:9': {
              ':T-dummy:2:3': {}
            },
          },
        }),
        file: {
          fullPath: '/tmp/dummy.ts',
          relativePath: 'dummy.ts',
          extension: 'ts',
        }
      }]);

      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadLength))).toBe(
        2
      );
      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadVocabulary))).toBe(1);
    });
  });

  describe('should count operator and operand', () => {
    it('should length is 5, and vocabulary is 3 when parent node is `dummy` text operand, child node has tow operator and tow operand.', () => {
      const actual = calculator.analyze([{
        astNode: new ASTNode(':root:0:0', {
          'C:DummyClass:0:20': {
            'M:T-dummy:1:9': {
              ':N-operator:2:3': {},
              ':N-operator:4:7': {
                ':T:operand:5:6': {},
                ':T:operand:6:7': {},
              },
            },
          },
        }),
        file: {
          fullPath: '/tmp/dummy.ts',
          relativePath: 'dummy.ts',
          extension: 'ts',
        }
      }]);

      expect(Number(actual[0].getMetricsByMetricsValue(HalsteadLength))).toBe(
        5
      );
      expect(
        Number(actual[0].getMetricsByMetricsValue(HalsteadVocabulary))
      ).toBe(3);
    });
  });
});
