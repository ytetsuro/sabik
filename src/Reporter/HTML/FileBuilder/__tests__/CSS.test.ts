import { CSS } from '../CSS';

describe('CSS', () => {
  describe('.build()', () => {
    it('should write css.', async () => {
      const writerMock = { write: jest.fn((_, __) => Promise.resolve()) };
      const css = new CSS(<any>writerMock);

      await css.build();

      expect(writerMock.write.mock.calls[0][0]).toBe('app.css');
    });
  });
});
