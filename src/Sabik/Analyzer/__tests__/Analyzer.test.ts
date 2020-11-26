import { ASTNode } from '../../../TestHelpers/ASTNode';
import { ComplexityCountableNode } from '../../../TestHelpers/ComplexityCountableNode';
import { HalsteadCountableNode } from '../../../TestHelpers/HalsteadCountableNode';
import { LineOfCodeCountableNode } from '../../../TestHelpers/LineOfCodeCountableNode';
import { File } from '../../FileFinder/File';
import { Analyzed } from '../Analyzed';
import { Analyzer } from '../Analyzer';

describe('Analyzer', () => {
  const analyzer = new Analyzer({
    complexityConverter: {
      convert: (_) =>
        new ComplexityCountableNode({
          DSL: 'IN',
          children: [{ DSL: 'I' }, { DSL: '' }],
        }),
    },
    halsteadConverter: {
      convert: (_) =>
        new HalsteadCountableNode({
          DSL: 'T',
          text: '+',
          children: [
            { DSL: 'N', text: '1' },
            { DSL: '', text: 'dummy' },
          ],
        }),
    },
    lineOfCodeConverter: {
      convert: (_) =>
        new LineOfCodeCountableNode(`1
                    2
                    // 3
                    4`),
    },
    astGenerator: {
      generate: () =>
        new ASTNode(':root:0:0', {
          'F:dummyFauxMethod1:1:9': {},
        }),
    },
  });

  describe('.analyze()', () => {
    it('should returns file Analyzed object.', () => {
      const actual = analyzer.analyze(
        new File('/tmp/bar/foo.txt', 'bar/foo.txt')
      );

      expect(actual).toBeInstanceOf(Analyzed);
      expect(actual.fileName).toBe('bar/foo.txt');
    });
  });
});
