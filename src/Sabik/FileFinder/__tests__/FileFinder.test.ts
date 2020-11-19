import { File } from '../File';
import { FileFinder } from '../FileFinder';

describe('FileFinder', () => {
  const fileFinder = new FileFinder(`${__dirname}`, /\.txt$/, [
    /\.ignore\.txt$/,
  ]);

  describe('.find()', () => {
    it('should get txt files when find txt file.', () => {
      const actual = fileFinder.find('./fixtures');

      expect(actual).toStrictEqual([
        new File(
          `${__dirname}/fixtures/foo/bar/baz.txt`,
          'fixtures/foo/bar/baz.txt'
        ),
        new File(`${__dirname}/fixtures/foo.txt`, 'fixtures/foo.txt'),
      ]);
    });
  });
});
