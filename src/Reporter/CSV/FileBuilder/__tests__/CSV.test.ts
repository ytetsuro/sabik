import { MetricsFactory } from '../../../../TestHelpers/MetricsFactory';
import { CSV } from '../CSV';

describe('CSV', () => {
  describe('.build()', () => {
    it('should write csv.', async () => {
      const writerMock = { write: jest.fn((_, __) => Promise.resolve()) };
      const css = new CSV(<any>writerMock);
      const metricsFactory = new MetricsFactory();
      const byteOrderMark = '\ufeff';

      await css.build(
        metricsFactory.create(
          '/tmp/foo.js|M b"a"r 0 3|HB:3 M:90 CC:5 LL:2',
          '/tmp/foo.js|M baz 4 6|HB:4 M:30 CC:20 LL:1',
          '/tmp/foo.js|F  0 7|LL:3',
          '/tmp/bar.js|F  0 3|LL:2',
          '/tmp/bar.js|f bar 0 3|HB:5 M:70 CC:8'
        )
      );

      expect(writerMock.write.mock.calls[0][1])
        .toBe(`${byteOrderMark}"name","fullPath","HalsteadBugsDelivered","Maintainability","CognitiveComplexity","LogicalLineOfCode"
"/tmp/foo.js.dummyClass.b""a""r","/tmp/foo.js","3","90","5","2"
"/tmp/foo.js.dummyClass.baz","/tmp/foo.js","4","30","20","1"
"/tmp/bar.js.bar","/tmp/bar.js","5","70","8",""`);
    });
  });
});
