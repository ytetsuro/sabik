import { ASTNode } from '../../TestHelpers/ASTNode';
import { Analyzer } from '../Analyzer';
import { CodePoint } from '../Metrics/CodePoint';
import { CodePointType } from '../Metrics/CodePointType';
import { Metrics } from '../Metrics/Metrics';
import { MetricsType } from '../../Calculator/MetricsType';

describe('Analyzer class.', () => {
  describe('should return a list of metrics parsed from the file.', () => {
    it('', () => {
      const files = [
        { fullPath: '/dev/null', relativePath: 'null', extension: '' },
      ];
      const generator = { generate: () => new ASTNode(':root:0:0', {}) };
      const analyzer = new Analyzer(
        generator,
        [
          {
            analyze: (sourceList) =>
              sourceList.map(
                (source) =>
                  new Metrics(
                    source.file,
                    [new CodePoint(CodePointType.Method, 'UnitTest', 1, 2)],
                    [
                      {
                        type: MetricsType.LogicalLineOfCode,
                        valueOf: () => 1,
                      },
                    ]
                  )
              ),
          },
        ],
        [
          {
            analyze: (metricsList) =>
              metricsList.map(
                (metrics) =>
                  new Metrics(metrics.file, metrics.codePoints, [
                    {
                      type: MetricsType.HalsteadVolume,
                      valueOf: () => 1,
                    },
                  ])
              ),
          },
        ]
      );

      const actual = analyzer.analyze(files);

      expect(actual.length).toBe(1);
      expect(actual[0].file).toStrictEqual({
        fullPath: '/dev/null',
        relativePath: 'null',
        extension: '',
      });
      expect(actual[0].codePoints).toStrictEqual([
        new CodePoint(CodePointType.Method, 'UnitTest', 1, 2),
      ]);
      expect(actual[0].toJSON().metricsList).toStrictEqual([
        {
          type: Number(MetricsType.HalsteadVolume),
          value: 1,
        },
        {
          type: Number(MetricsType.LogicalLineOfCode),
          value: 1,
        },
      ]);
    });
  });
});
