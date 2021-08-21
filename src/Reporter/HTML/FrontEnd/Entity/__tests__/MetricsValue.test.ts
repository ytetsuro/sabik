import { MetricsType } from '../MetricsType';
import { MetricsValue } from '../MetricsValue';

describe('MetricsValue', () => {
  describe('.valueOf()', () => {
    it('should be rounded if there are two or more decimal places.', () => {
      const actual = new MetricsValue(MetricsType.Maintainability, 23.212);

      expect(Number(actual)).toBe(23.21);
    });

    it('should return 0 when value is null.', () => {
      const actual = new MetricsValue(MetricsType.HalsteadBugsDelivered, null);

      expect(Number(actual)).toBe(0);
    });
  });

  describe('.toString()', () => {
    it('should return a readable number.', () => {
      const actual = new MetricsValue(MetricsType.HalsteadBugsDelivered, 10223.212);

      expect(String(actual)).toBe('10,223.21');
    });

    it('should return a `−` when value is null.', () => {
      const actual = new MetricsValue(MetricsType.HalsteadBugsDelivered, null);

      expect(String(actual)).toBe('−');
    });
  });

  describe('.getLevel()', () => {
    it('should return level.', () => {
      const actual = new MetricsValue(MetricsType.HalsteadBugsDelivered, 10223.212);

      expect(actual.getLevel()).toBe(2);
    });

    it('should return 0 when value is null.', () => {
      const actual = new MetricsValue(MetricsType.Maintainability, null);

      expect(actual.getLevel()).toBe(0);
    });
  });
});
