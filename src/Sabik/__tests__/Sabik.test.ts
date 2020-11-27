import { ASTNode } from '../../TestHelpers/ASTNode';
import { ComplexityCountableNode } from '../../TestHelpers/ComplexityCountableNode';
import { HalsteadCountableNode } from '../../TestHelpers/HalsteadCountableNode';
import { LineOfCodeCountableNode } from '../../TestHelpers/LineOfCodeCountableNode';
import { Analyzed } from '../Analyzer/Analyzed';
import { AnalyzerMap } from '../AnalyzerMap';
import { File } from '../FileFinder/File';
import { Reporter } from '../Reporter';
import { Sabik } from '../Sabik';

describe('Sabik', () => {
  describe('exec()', () => {
    let sabik: Sabik;
    let reporter: { output: jest.Mock<Promise<void>> };
    beforeEach(() => {
      reporter = { output: jest.fn((_) => Promise.resolve()) };
      const map = new AnalyzerMap();
      map.register('.txt', {
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

      sabik = new Sabik(
        map,
        <any>{
          find: () => [
            new File('/tmp/foo.txt', 'foo.txt'),
            new File('/tmp/bar.md', 'bar.md'),
          ],
        },
        reporter
      );
    });

    it('should analyze only analyzeable source.', async () => {
      await sabik.exec('./');

      expect(reporter.output.mock.calls[0][0].length).toBe(1);
      expect(reporter.output.mock.calls[0][0][0].fileName).toBe('foo.txt');
    });
  });
});
