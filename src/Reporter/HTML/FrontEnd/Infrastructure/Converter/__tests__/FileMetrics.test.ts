import { FileMetrics } from '../FileMetrics';
import { Metrics } from '../Metrics';
import { MetricsValue } from '../MetricsValue';

describe('Metrics', () => {
  describe('.to()', () => {
    it('should convert dataModel to entity.', () => {
      const converter = new FileMetrics(new Metrics(new MetricsValue()));
      const actual = converter.to({
        fileName: 'dummy.ts',
        codePointType: 2,
        name: 'UnitTest',
        startLineNumber: 0,
        endLineNumber: 1000,
        metricsList: [
          {type: 8, value: 800,},
          {type: 9, value: 1000,},
        ],
      }, []);

      expect(actual.fileName).toBe('dummy.ts');
      expect(actual.logicalLineOfCode).toStrictEqual(800);
      expect(actual.physicalLineOfCode).toStrictEqual(1000);
    });
  });
});
