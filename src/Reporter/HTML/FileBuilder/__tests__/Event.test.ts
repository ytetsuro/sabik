import { basename, dirname } from 'path';
import { LogicalLineOfCode } from '../../../../Analyzer/CodeMetricsCalculator/LineOfCode/MetricsValue/LogicalLineOfCode';
import { Metrics } from '../../../../Analyzer/Metrics/Metrics';
import { Event } from '../Event';
import { CodePoint } from '../../../../Analyzer/Metrics/CodePoint';
import { CodePointType } from '../../../../Analyzer/Metrics/CodePointType';

describe('Event', () => {
  describe('build', () => {
    it('should create html.', async () => {
      const writerMock = { write: jest.fn((_, __) => Promise.resolve()) };
      const relativePath = basename(__filename);
      const builder = new Event(<any>writerMock, dirname(__filename));

      await builder.build([
        new Metrics(
          { fullPath: __filename, relativePath, extension: '.ts' },
          [new CodePoint(CodePointType.Method, 'unitTest', 0, 1)],
          [new LogicalLineOfCode(2)]
        ),
      ]);

      expect(writerMock.write.mock.calls.length).toBe(2);
      expect(writerMock.write.mock.calls[0][0]).toBe('event/analyzed.js');
      expect(writerMock.write.mock.calls[1][0]).toBe(
        `event/sourceCode/${basename(__filename)}.js`
      );
    });
  });
});
