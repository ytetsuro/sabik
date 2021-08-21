import { statSync } from 'fs';
import { existsSync } from 'fs';
import { createWriteStream } from 'fs';
import { Writable } from 'stream';
import { MetricsFactory } from '../../../../TestHelpers/MetricsFactory';
import { JSON } from '../JSON';

jest.mock('fs');

describe('JSON', () => {
  beforeEach(() => {
    (<jest.Mock>existsSync).mockClear();
    (<jest.Mock>statSync).mockClear();
  });

  describe('.constructor', () => {
    it('should throw error when exists directory.', async () => {
      (<jest.Mock>existsSync).mockReturnValueOnce(true);
      (<jest.Mock>statSync).mockReturnValueOnce({ isDirectory: () => true });
      let isThrows = false;

      try {
        new JSON(__dirname);
      } catch (_) {
        isThrows = true;
      }

      expect(isThrows).toBe(true);
    });
  });

  describe('.build()', () => {
    it('should write json.', async () => {
      const output = new (class extends Writable {
        private buffers: string[] = [];

        _write(buffer: Buffer) {
          this.buffers.push(buffer.toString());
        }

        toString() {
          return this.buffers.join('');
        }
      })();
      (<jest.Mock>createWriteStream).mockReturnValueOnce(output);

      const json = new JSON('./dummy');
      const metricsFactory = new MetricsFactory();

      await json.build(
        metricsFactory.create(
          '/tmp/foo.js|M bar 0 3|HB:3 M:90 CC:5 LL:2',
          '/tmp/foo.js|M baz 4 6|HB:4 M:30 CC:20 LL:1',
          '/tmp/foo.js|F  0 7|LL:3',
          '/tmp/bar.js|F  0 3|LL:2',
          '/tmp/bar.js|f bar 0 3|HB:5 M:70 CC:8'
        )
      );

      expect(String(output)).toBe(
        global.JSON.stringify({
          summaries: {
            'LogicalLineOfCode(Sum)': {
              value: 5,
            },
            'LogicalLineOfCode(Average per file)': {
              value: 2.5,
            },
            'LogicalLineOfCode(Average per method)': {
              value: 1.5,
            },
            'CognitiveComplexity(Max)': {
              name: '/tmp/foo.js.dummyClass.baz',
              value: 20,
            },
            'CognitiveComplexity(Average)': {
              value: 11,
            },
            'Maintainability(Min)': {
              name: '/tmp/foo.js.dummyClass.baz',
              value: 30,
            },
            'Maintainability(Average)': {
              value: 63.333333333333336,
            },
            'BugDelivered(Sum)': {
              value: 12,
            },
            'BugDelivered(Average)': {
              value: 4,
            },
          },
          details: [
            {
              fileName: '/tmp/foo.js',
              name: '/tmp/foo.js.dummyClass.bar',
              codePointType: 3,
              startLineNumber: 0,
              endLineNumber: 3,
              metricsList: [
                {
                  type: 1,
                  typeLabel: 'HalsteadBugsDelivered',
                  value: 3,
                },
                {
                  type: 10,
                  typeLabel: 'Maintainability',
                  value: 90,
                },
                {
                  type: 0,
                  typeLabel: 'CognitiveComplexity',
                  value: 5,
                },
                {
                  type: 8,
                  typeLabel: 'LogicalLineOfCode',
                  value: 2,
                },
              ],
            },
            {
              fileName: '/tmp/foo.js',
              name: '/tmp/foo.js.dummyClass.baz',
              codePointType: 3,
              startLineNumber: 4,
              endLineNumber: 6,
              metricsList: [
                {
                  type: 1,
                  typeLabel: 'HalsteadBugsDelivered',
                  value: 4,
                },
                {
                  type: 10,
                  typeLabel: 'Maintainability',
                  value: 30,
                },
                {
                  type: 0,
                  typeLabel: 'CognitiveComplexity',
                  value: 20,
                },
                {
                  type: 8,
                  typeLabel: 'LogicalLineOfCode',
                  value: 1,
                },
              ],
            },
            {
              fileName: '/tmp/foo.js',
              name: '',
              codePointType: 0,
              startLineNumber: 0,
              endLineNumber: 7,
              metricsList: [
                {
                  type: 8,
                  typeLabel: 'LogicalLineOfCode',
                  value: 3,
                },
              ],
            },
            {
              fileName: '/tmp/bar.js',
              name: '',
              codePointType: 0,
              startLineNumber: 0,
              endLineNumber: 3,
              metricsList: [
                {
                  type: 8,
                  typeLabel: 'LogicalLineOfCode',
                  value: 2,
                },
              ],
            },
            {
              fileName: '/tmp/bar.js',
              name: '/tmp/bar.js.bar',
              codePointType: 3,
              startLineNumber: 0,
              endLineNumber: 3,
              metricsList: [
                {
                  type: 1,
                  typeLabel: 'HalsteadBugsDelivered',
                  value: 5,
                },
                {
                  type: 10,
                  typeLabel: 'Maintainability',
                  value: 70,
                },
                {
                  type: 0,
                  typeLabel: 'CognitiveComplexity',
                  value: 8,
                },
              ],
            },
          ],
        })
      );
    });
  });
});
