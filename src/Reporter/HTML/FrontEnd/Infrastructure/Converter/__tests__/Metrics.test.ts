import { Metrics } from '../Metrics';
import { MetricsValue as MetricsValueConverter } from '../MetricsValue';
import { Metrics as Entity } from '../../../Entity/Metrics';
import { MetricsValue } from '../../../Entity/MetricsValue';
import { MetricsType } from '../../../Entity/MetricsType';

describe('Metrics', () => {
  describe('.to()', () => {
    it('should convert dataModel to entity.', () => {
      const converter = new Metrics(new MetricsValueConverter());
      const actual = converter.to({
        fileName: 'ThisIsFileName.md',
        codePointType: 2,
        name: 'UnitTest',
        startLineNumber: 0,
        endLineNumber: 1000,
        metricsList: [
          { type: 0, value: 80 },
          { type: 1, value: 700 },
          { type: 2, value: 100 },
          { type: 3, value: 200 },
          { type: 4, value: 300 },
          { type: 5, value: 400 },
          { type: 6, value: 500 },
          { type: 7, value: 600 },
          { type: 8, value: 800 },
          { type: 9, value: 1000 },
          { type: 10, value: 900 },
        ],
      });

      expect(actual).toStrictEqual(
        new Entity(
          'UnitTest',
          [
            new MetricsValue(MetricsType.CognitiveComplexity, 80),
            new MetricsValue(MetricsType.HalsteadBugsDelivered, 700),
            new MetricsValue(MetricsType.HalsteadVolume, 100),
            new MetricsValue(MetricsType.HalsteadLength, 200),
            new MetricsValue(MetricsType.HalsteadVocabulary, 300),
            new MetricsValue(MetricsType.HalsteadDifficulty, 400),
            new MetricsValue(MetricsType.HalsteadEffort, 500),
            new MetricsValue(MetricsType.HalsteadTime, 600),
            new MetricsValue(MetricsType.LineOfCodeLogical, 800),
            new MetricsValue(MetricsType.LineOfCodePhysical, 1000),
            new MetricsValue(MetricsType.Maintainability, 900),
          ],
          { start: 0, end: 1000 }
        )
      );
    });
  });
});
