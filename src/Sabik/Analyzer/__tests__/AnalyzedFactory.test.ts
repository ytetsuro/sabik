import { AnalyzedFactory } from '../AnalyzedFactory';
import { LineOfCode } from '../../../Calculator/LineOfCode/LineOfCode';
import { Analyzed } from '../Analyzed';

describe('AnalyzedFactory', () => {
  describe('.create()', () => {
    it('should throw error when empty file meta.', () => {
      const analyzedFactory = new AnalyzedFactory();

      let isThrows = false;

      try {
        analyzedFactory.create([]);
      } catch (_) {
        isThrows = true;
      }

      expect(isThrows).toBe(true);
    });

    it('should create analyzed class.', () => {
      const analyzedFactory = new AnalyzedFactory();

      analyzedFactory.setFileMeta('test.js', new LineOfCode(2, 1));
      const actual = analyzedFactory.create([]);

      expect(actual).toBeInstanceOf(Analyzed);
    });
  });
});
