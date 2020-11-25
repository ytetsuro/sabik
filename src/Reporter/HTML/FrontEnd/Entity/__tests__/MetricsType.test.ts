import { MetricsType } from '../MetricsType';

describe('MetricsType', () => {
  describe('.toString()', () => {
    it('should to string.', () => {
      expect(String(MetricsType.BugsDelivered)).toBe('BugsDelivered');
    });
  });

  describe('.getLevel()', () => {
    it.each([
      [MetricsType.BugsDelivered, 2],
      [MetricsType.CognitiveComplexity, 8],
      [MetricsType.LineOfCodeLogical, 80],
      [MetricsType.Maintainability, 39],
    ])('should get alert level.', (type, value) => {
      expect(type.getLevel(value)).toBe(2);
    });

    it.each([
      [MetricsType.LineOfCodeLogical, 21],
      [MetricsType.Maintainability, 40],
      [MetricsType.Maintainability, 59],
    ])('should get alert level.', (type, value) => {
      expect(type.getLevel(value)).toBe(1);
    });
  });
});
