import { ASTNode } from '../../TestHelpers/ASTNode';
import { ComplexityCountableNode } from '../../TestHelpers/ComplexityCountableNode';
import { HalsteadCountableNode } from '../../TestHelpers/HalsteadCountableNode';
import { LineOfCodeCountableNode } from '../../TestHelpers/LineOfCodeCountableNode';
import { File } from '../FileFinder/File';
import { Language } from '../Language/Language';
import { Reporter } from '../Reporter';
import { Sabik } from '../Sabik';

describe('Sabik', () => {
  describe('exec()', () => {
    let sabik: Sabik;
    let reporter: jest.Mocked<Reporter>;
    beforeEach(() => {
      reporter = { output: jest.fn((_) => Promise.resolve()) };
      const language = new Language([
        {
          extensions: ['.txt'],
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
          astNodeConstructor: ASTNode,
        },
      ]);

      sabik = new Sabik(
        language,
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

      expect(reporter.output.mock.calls[0][0].length).toBe(2);
      expect(
        reporter.output.mock.calls[0][0].map(({ file }) => file.relativePath)
      ).toStrictEqual(['foo.txt', 'foo.txt']);
    });
  });
});
