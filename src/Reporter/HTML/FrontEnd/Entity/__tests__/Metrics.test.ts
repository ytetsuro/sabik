import { Metrics } from '../Metrics';
import { MetricsType } from '../MetricsType';
import { MetricsValue } from '../MetricsValue';

describe('Metrics', () => {
  describe('.getStartLineNumber()', () => {
    it('should returns start line number.', () => {
      const actual = new Metrics('dummy.ts', [], { start: 0, end: 2 });

      expect(actual.getStartLineNumber()).toBe(0);
    });
  });

  describe('.getEndLineNumber()', () => {
    it('should returns end line number.', () => {
      const actual = new Metrics('dummy.ts', [], { start: 0, end: 2 });

      expect(actual.getEndLineNumber()).toBe(2);
    });
  });

  describe('.getEndLineNumber()', () => {
    it('should returns end line number.', () => {
      const actual = new Metrics('dummy.ts', [], { start: 0, end: 2 });

      expect(actual.getEndLineNumber()).toBe(2);
    });
  });

  describe('.getOverview()', () => {
    it('should returns overview metrics.', () => {
      const overviews = [
        new MetricsValue(MetricsType.Maintainability, 20),
        new MetricsValue(MetricsType.BugsDelivered, 20),
        new MetricsValue(MetricsType.CongnativeComplexity, 20),
      ];

      const actual = new Metrics(
        'dummy.ts',
        [...overviews, new MetricsValue(MetricsType.HalsteadDifficulty, 20)],
        { start: 0, end: 2 }
      );

      expect(actual.getOverview()).toStrictEqual(overviews);
    });
  });

  describe('.getDetails()', () => {
    it('should returns details metrics.', () => {
      const details = [new MetricsValue(MetricsType.HalsteadDifficulty, 20)];

      const actual = new Metrics(
        'dummy.ts',
        [
          new MetricsValue(MetricsType.Maintainability, 20),
          new MetricsValue(MetricsType.BugsDelivered, 20),
          new MetricsValue(MetricsType.CongnativeComplexity, 20),
          ...details,
        ],
        { start: 0, end: 2 }
      );

      expect(actual.getDetails()).toStrictEqual(details);
    });
  });

  describe('.getByType()', () => {
    it('should returns match type.', () => {
      const actual = new Metrics(
        'dummy.ts',
        [
          new MetricsValue(MetricsType.Maintainability, 20),
          new MetricsValue(MetricsType.BugsDelivered, 20),
          new MetricsValue(MetricsType.CongnativeComplexity, 20),
          new MetricsValue(MetricsType.HalsteadDifficulty, 20),
        ],
        { start: 0, end: 2 }
      );

      expect(actual.getByType(MetricsType.HalsteadDifficulty)!.type).toBe(
        MetricsType.HalsteadDifficulty
      );
    });
  });
});
