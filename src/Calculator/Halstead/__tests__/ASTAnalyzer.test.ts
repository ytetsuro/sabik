import { Calculator } from '../Calculator';
import { HalsteadCountableNode } from '../../../TestHelpers/HalsteadCountableNode';
import { HalsteadLength } from '../MetricsValue/HalsteadLength';
import { HalsteadVocabulary } from '../MetricsValue/HalsteadVocabulary';

describe('Halstead Calculator', () => {
  describe('should count operand.', () => {
    it('should length is 1 when operand node.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(
        new HalsteadCountableNode({ DSL: 'N', text: 'dummy' })
      );

      expect(actual.length).toBe(7);
      expect(Number(actual.find((row) => row instanceof HalsteadLength))).toBe(
        1
      );
    });

    it('should length is 1 when child node is operand node.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(
        new HalsteadCountableNode({
          DSL: '',
          text: 'Dummy',
          children: [{ DSL: 'N', text: 'Dummy' }],
        })
      );

      expect(Number(actual.find((row) => row instanceof HalsteadLength))).toBe(
        1
      );
    });

    it('should length is 2, and vocabulary is 1 when parent node is `dummy` text operand, child node is `dummy` text operand.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(
        new HalsteadCountableNode({
          DSL: 'N',
          text: 'dummy',
          children: [{ DSL: 'N', text: 'dummy' }],
        })
      );

      expect(Number(actual.find((row) => row instanceof HalsteadLength))).toBe(
        2
      );
      expect(
        Number(actual.find((row) => row instanceof HalsteadVocabulary))
      ).toBe(1);
    });
  });

  describe('should count operator', () => {
    it('should length is 1 when root node is operator node.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(
        new HalsteadCountableNode({
          DSL: 'T',
          text: 'dummy',
        })
      );

      expect(Number(actual.find((row) => row instanceof HalsteadLength))).toBe(
        1
      );
    });

    it('should length is 1 when child node is operator node.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(
        new HalsteadCountableNode({
          DSL: '',
          text: 'Dummy',
          children: [{ DSL: 'T', text: 'Dummy' }],
        })
      );

      expect(Number(actual.find((row) => row instanceof HalsteadLength))).toBe(
        1
      );
    });

    it('should length is 2, and vocabulary is 1 when parent node is `dummy` text operator, child node is `dummy` text operator.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(
        new HalsteadCountableNode({
          DSL: 'T',
          text: 'dummy',
          children: [{ DSL: 'T', text: 'dummy' }],
        })
      );

      expect(Number(actual.find((row) => row instanceof HalsteadLength))).toBe(
        2
      );
      expect(
        Number(actual.find((row) => row instanceof HalsteadVocabulary))
      ).toBe(1);
    });
  });

  describe('should count operator and operand', () => {
    it('should length is 5, and vocabulary is 3 when parent node is `dummy` text operand, child node has tow operator and tow operand.', () => {
      const analyzer = new Calculator();
      const actual = analyzer.calculate(
        new HalsteadCountableNode({
          DSL: 'T',
          text: 'dummy',
          children: [
            { DSL: 'N', text: 'operator' },
            {
              DSL: 'N',
              text: 'operator',
              children: [
                { DSL: 'T', text: 'operand' },
                { DSL: 'T', text: 'operand' },
              ],
            },
          ],
        })
      );

      expect(Number(actual.find((row) => row instanceof HalsteadLength))).toBe(
        5
      );
      expect(
        Number(actual.find((row) => row instanceof HalsteadVocabulary))
      ).toBe(3);
    });
  });
});
