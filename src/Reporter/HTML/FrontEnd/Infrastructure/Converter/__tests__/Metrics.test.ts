import { Metrics } from '../Metrics';
import { Metrics as Entity } from '../../../Entity/Metrics';
import { MetricsValue } from '../../../Entity/MetricsValue';
import { MetricsType } from '../../../Entity/MetricsType';

describe('Metrics', () => {
  describe('.to()', () => {
    it('should convert dataModel to entity.', () => {
      const converter = new Metrics();
      const actual = converter.to({
        defineName: 'UnitTest',
        position: {
          start: 0,
          end: 1000,
        },
        halstead: {
          operands: [],
          operators: [],
          volume: 100,
          length: 200,
          vocabulary: 300,
          difficulty: 400,
          effort: 500,
          time: 600,
          bugsDelivered: 700,
        },
        congnitiveComplexity: {
          complexity: 80,
          items: [
            {
              complexity: 1,
              deepCount: 79,
            },
          ],
        },
        lineOfCode: {
          physical: 1000,
          logical: 800,
        },
        maintainability: {
          maintainability: 900,
        },
      });

      expect(actual).toStrictEqual(
        new Entity(
          'UnitTest',
          [
            new MetricsValue(MetricsType.CongnativeComplexity, 80),
            new MetricsValue(MetricsType.HalsteadLength, 200),
            new MetricsValue(MetricsType.HalsteadDifficulty, 400),
            new MetricsValue(MetricsType.HalsteadEffort, 500),
            new MetricsValue(MetricsType.HalsteadTime, 600),
            new MetricsValue(MetricsType.HalsteadVocabulary, 300),
            new MetricsValue(MetricsType.HalsteadVolume, 100),
            new MetricsValue(MetricsType.BugsDelivered, 700),
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
