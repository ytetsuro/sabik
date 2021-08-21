import { FileMetrics } from '../FileMetrics';
import { Metrics } from '../Metrics';
import { MetricsType } from '../MetricsType';
import { MetricsValue } from '../MetricsValue';

describe('FileMetrics', () => {
  describe('.getLength()', () => {
    it('should returns metrics length.', () => {
      const metrics = new FileMetrics(
        'dummy.ts',
        new Metrics(
          'dummy.ts',
          [new MetricsValue(MetricsType.LineOfCodeLogical, 1), new MetricsValue(MetricsType.LineOfCodePhysical, 2)],
          { start: 0, end: 2 }
        ),
        []
      );

      expect(metrics.getLength()).toBe(0);
    });
  });

  describe('.getMaximumComplexity()', () => {
    it('should returns maximumComplexity.', () => {
      const expected = new MetricsValue(MetricsType.CognitiveComplexity, 4);
      const metrics = new FileMetrics(
        'dummy.ts',
        new Metrics(
          'dummy.ts',
          [new MetricsValue(MetricsType.LineOfCodeLogical, 1), new MetricsValue(MetricsType.LineOfCodePhysical, 2)],
          { start: 0, end: 2 }
        ),
        [
          new Metrics('test', [expected], { start: 0, end: 1 }),
          new Metrics('test2', [new MetricsValue(MetricsType.CognitiveComplexity, 3)], { start: 0, end: 1 }),
        ]
      );

      expect(metrics.getMaximumComplexity()).toStrictEqual(expected);
    });
  });

  describe('.getAverageComplexity()', () => {
    it('should returns average complexity.', () => {
      const metrics = new FileMetrics(
        'dummy.ts',
        new Metrics(
          'dummy.ts',
          [new MetricsValue(MetricsType.LineOfCodeLogical, 1), new MetricsValue(MetricsType.LineOfCodePhysical, 2)],
          { start: 0, end: 2 }
        ),
        [
          new Metrics('test', [new MetricsValue(MetricsType.CognitiveComplexity, 4)], { start: 0, end: 1 }),
          new Metrics('test2', [new MetricsValue(MetricsType.CognitiveComplexity, 3)], { start: 0, end: 1 }),
        ]
      );

      expect(metrics.getAverageComplexity()).toStrictEqual(new MetricsValue(MetricsType.CognitiveComplexity, 3.5));
    });
  });

  describe('.getMaximumBugsDelivered()', () => {
    it('should returns maximumBugsDelivered.', () => {
      const expected = new MetricsValue(MetricsType.HalsteadBugsDelivered, 4);
      const metrics = new FileMetrics(
        'dummy.ts',
        new Metrics(
          'dummy.ts',
          [new MetricsValue(MetricsType.LineOfCodeLogical, 1), new MetricsValue(MetricsType.LineOfCodePhysical, 2)],
          { start: 0, end: 2 }
        ),
        [
          new Metrics('test', [expected], { start: 0, end: 1 }),
          new Metrics('test2', [new MetricsValue(MetricsType.HalsteadBugsDelivered, 3)], {
            start: 0,
            end: 1,
          }),
        ]
      );

      expect(metrics.getMaximumBugsDelivered()).toStrictEqual(expected);
    });
  });

  describe('.getSumBugsDelivered()', () => {
    it('should returns average bugsDelivered.', () => {
      const metrics = new FileMetrics(
        'dummy.ts',
        new Metrics(
          'dummy.ts',
          [new MetricsValue(MetricsType.LineOfCodeLogical, 1), new MetricsValue(MetricsType.LineOfCodePhysical, 2)],
          { start: 0, end: 2 }
        ),
        [
          new Metrics('test', [new MetricsValue(MetricsType.HalsteadBugsDelivered, 4)], {
            start: 0,
            end: 1,
          }),
          new Metrics('test2', [new MetricsValue(MetricsType.HalsteadBugsDelivered, 3)], {
            start: 0,
            end: 1,
          }),
        ]
      );

      expect(metrics.getSumBugsDelivered()).toStrictEqual(new MetricsValue(MetricsType.HalsteadBugsDelivered, 7));
    });
  });

  describe('.getMinimumMaintainability()', () => {
    it('should returns minimumMaintainability.', () => {
      const expected = new MetricsValue(MetricsType.Maintainability, 4);
      const metrics = new FileMetrics(
        'dummy.ts',
        new Metrics(
          'dummy.ts',
          [new MetricsValue(MetricsType.LineOfCodeLogical, 1), new MetricsValue(MetricsType.LineOfCodePhysical, 2)],
          { start: 0, end: 2 }
        ),
        [
          new Metrics('test', [expected], { start: 0, end: 1 }),
          new Metrics('test2', [new MetricsValue(MetricsType.Maintainability, 5)], { start: 0, end: 1 }),
        ]
      );

      expect(metrics.getMinimumMaintainability()).toStrictEqual(expected);
    });
  });

  describe('.getAverageMaintainability()', () => {
    it('should returns average maintainability.', () => {
      const metrics = new FileMetrics(
        'dummy.ts',
        new Metrics(
          'dummy.ts',
          [new MetricsValue(MetricsType.LineOfCodeLogical, 1), new MetricsValue(MetricsType.LineOfCodePhysical, 2)],
          { start: 0, end: 2 }
        ),
        [
          new Metrics('test', [new MetricsValue(MetricsType.Maintainability, 4)], { start: 0, end: 1 }),
          new Metrics('test2', [new MetricsValue(MetricsType.Maintainability, 3)], { start: 0, end: 1 }),
        ]
      );

      expect(metrics.getAverageMaintainability()).toStrictEqual(new MetricsValue(MetricsType.Maintainability, 3.5));
    });
  });
});
