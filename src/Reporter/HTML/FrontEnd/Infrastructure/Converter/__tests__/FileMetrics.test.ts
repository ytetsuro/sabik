import { FileMetrics } from '../FileMetrics';
import { Metrics } from '../Metrics';

describe('Metrics', () => {
  describe('.to()', () => {
    it('should convert dataModel to entity.', () => {
      const converter = new FileMetrics(new Metrics());
      const actual = converter.to({
        fileName: 'dummy.ts',
        lineOfCode: {
          logical: 800,
          physical: 1000,
        },
        metrics: [
          {
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
          },
        ],
      });

      expect(actual.fileName).toBe('dummy.ts');
      expect(actual.logicalLineOfCode).toStrictEqual(800);
      expect(actual.physicalLineOfCode).toStrictEqual(1000);
    });
  });
});
