import { File } from '../../../Sabik/FileFinder/File';
import { CodePoint } from '../CodePoint';
import { CodePointType } from '../CodePointType';
import { Metrics } from '../Metrics';
import { MetricsType } from '../MetricsType';

class DummyMetricsValue {
  type = MetricsType.CognitiveComplexity;
  valueOf() {
    return 2;
  }
}

describe('Metrics', () => {
  describe('should getMetricsByMetricsValue returns metrics value matching the type.', () => {
    it('should getMetricsByMetricsValue returns `DummyMetricsValue` when type is `DummyMetricsValue`.', () => {
      const metricsValue = new DummyMetricsValue();
      const metrics = new Metrics(
        new File('/unit/test/path', './test/path'),
        [new CodePoint(CodePointType.Method, 'WhoAmI', 0, 1)],
        [
          metricsValue,
          { type: MetricsType.CognitiveComplexity, valueOf: () => 2 },
        ]
      );

      expect(
        metrics.getMetricsByMetricsValue(DummyMetricsValue)
      ).toBeInstanceOf(DummyMetricsValue);
    });

    it('should getMetricsByMetricsValue returns null when has not type.', () => {
      const metrics = new Metrics(
        new File('/unit/test/path', './test/path'),
        [new CodePoint(CodePointType.Method, 'WhoAmI', 0, 1)],
        [{ type: MetricsType.CognitiveComplexity, valueOf: () => 2 }]
      );

      expect(metrics.getMetricsByMetricsValue(DummyMetricsValue)).toBe(null);
    });
  });
});
