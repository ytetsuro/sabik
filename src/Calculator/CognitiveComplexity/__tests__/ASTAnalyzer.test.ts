import { Calculator } from '../Calculator';
import { ComplexityCountableNode } from '../../../TestHelpers/ComplexityCountableNode';

describe('Cognitive Complexity Calculator', () => {
  describe('should increment when incrementable node.', () => {
    it('should returns 1 when incrementable node.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(new ComplexityCountableNode({ DSL: 'I' }));

      expect(Number(actual[0])).toBe(1);
    });

    it('should returns 1 when childNode is incrementable node.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(new ComplexityCountableNode({
          DSL: '',
          children: [{ DSL: 'I' }],
        }));

      expect(Number(actual[0])).toBe(1);
    });

    it('should return 1 when incrementable node in nest level up node.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(new ComplexityCountableNode({
        DSL: 'N',
        children: [{ DSL: 'I' }],
      }));

      expect(Number(actual[0])).toBe(1);
    });

    it('should return 2 when net incrementable node in nest level up node.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(new ComplexityCountableNode({
        DSL: 'N',
        children: [{ DSL: 'IN' }],
      }));

      expect(Number(actual[0])).toBe(2);
    });
  });
});
