import { Metrics } from '../../Analyzer/Metrics/Metrics';
import { getDouble } from '../../TestHelpers/getDouble';
import { Analyzer } from '../Analyzer/Analyzer';
import { File } from '../FileFinder/File';
import { Reporter } from '../Reporter';
import { Sabik } from '../Sabik';

describe('Sabik', () => {
  describe('exec()', () => {
    let sabik: Sabik;
    let reporter: jest.Mocked<Reporter>;
    beforeEach(() => {
      reporter = { output: jest.fn((_) => Promise.resolve()) };
      const analyzer = <Analyzer>getDouble(Analyzer, {
        analyze: (fileList: File[]) =>
          fileList.map((file) => new Metrics(file, [], [])),
      });

      sabik = new Sabik(
        analyzer,
        <any>{
          find: () => [
            new File('/tmp/foo.txt', 'foo.txt'),
            new File('/tmp/bar.md', 'bar.md'),
          ],
        },
        reporter
      );
    });

    it('should analyze source code.', async () => {
      await sabik.exec('./');

      expect(reporter.output.mock.calls[0][0].length).toBe(2);
      expect(
        reporter.output.mock.calls[0][0].map(({ file }) => file.relativePath)
      ).toStrictEqual(['foo.txt', 'bar.md']);
    });
  });
});
