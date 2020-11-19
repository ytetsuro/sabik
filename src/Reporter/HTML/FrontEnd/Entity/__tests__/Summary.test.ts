import { FileMetrics } from '../FileMetrics';
import { Metrics } from '../Metrics';
import { MetricsType } from '../MetricsType';
import { MetricsValue } from '../MetricsValue';
import { Summary } from '../Summary';

describe('Summary', () => {
  describe('.getAverageComplexity()', () => {
    it('should returns average complexity.', () => {
      const summary = new Summary([
        new FileMetrics('dummy1.ts', { logical: 1, physical: 2 }, [
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.CongnativeComplexity, 2)],
            { start: 1, end: 1 }
          ),
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.CongnativeComplexity, 5)],
            { start: 1, end: 1 }
          ),
        ]),
        new FileMetrics('dummy2.ts', { logical: 1, physical: 2 }, [
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.CongnativeComplexity, 5)],
            { start: 1, end: 1 }
          ),
        ]),
      ]);

      expect(summary.getAverageComplexity()).toStrictEqual(
        new MetricsValue(MetricsType.CongnativeComplexity, 4)
      );
    });
  });

  describe('.getAverageMaintainability()', () => {
    it('should returns average maintainability.', () => {
      const summary = new Summary([
        new FileMetrics('dummy1.ts', { logical: 1, physical: 2 }, [
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.Maintainability, 2)],
            { start: 1, end: 1 }
          ),
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.Maintainability, 5)],
            { start: 1, end: 1 }
          ),
        ]),
        new FileMetrics('dummy2.ts', { logical: 1, physical: 2 }, [
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.Maintainability, 5)],
            { start: 1, end: 1 }
          ),
        ]),
      ]);

      expect(summary.getAverageMaintainability()).toStrictEqual(
        new MetricsValue(MetricsType.Maintainability, 4)
      );
    });
  });

  describe('.getTotalLineOfCode()', () => {
    it('should returns total line of code.', () => {
      const summary = new Summary([
        new FileMetrics('dummy1.ts', { logical: 1, physical: 2 }, [
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.Maintainability, 2)],
            { start: 1, end: 1 }
          ),
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.Maintainability, 5)],
            { start: 1, end: 1 }
          ),
        ]),
        new FileMetrics('dummy2.ts', { logical: 1, physical: 2 }, [
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.Maintainability, 5)],
            { start: 1, end: 1 }
          ),
        ]),
      ]);

      expect(summary.getTotalLineOfCode()).toBe(2);
    });
  });

  describe('.getSumBugsDelivered()', () => {
    it('should returns sum bugs delivered.', () => {
      const summary = new Summary([
        new FileMetrics('dummy1.ts', { logical: 1, physical: 2 }, [
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.BugsDelivered, 2)],
            { start: 1, end: 1 }
          ),
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.BugsDelivered, 5)],
            { start: 1, end: 1 }
          ),
        ]),
        new FileMetrics('dummy2.ts', { logical: 1, physical: 2 }, [
          new Metrics(
            'dummy',
            [new MetricsValue(MetricsType.BugsDelivered, 5)],
            { start: 1, end: 1 }
          ),
        ]),
      ]);

      expect(summary.getSumBugsDelivered()).toStrictEqual(
        new MetricsValue(MetricsType.BugsDelivered, 12)
      );
    });
  });
});
