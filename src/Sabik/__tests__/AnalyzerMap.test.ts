import { AnalyzerMap } from '../AnalyzerMap';
import { TypeScript } from '../Language/TypeScript';

describe('AnalyzerMap', () => {
  describe('.register', () => {
    it('should register analyzer when 1st args is string.', () => {
      const actual = new AnalyzerMap();
      actual.register('.ts', new TypeScript());

      expect(actual.has('.ts')).toBe(true);
    });

    it('should register analyzer when 1st args is string list.', () => {
      const actual = new AnalyzerMap();
      actual.register(['.ts', '.js'], new TypeScript());

      expect(actual.has('.ts')).toBe(true);
      expect(actual.has('.js')).toBe(true);
    });
  });
});
