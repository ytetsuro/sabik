import { HTML } from '../HTML';

describe('HTML', () => {
  describe('build', () => {
    it('should create html.', async () => {
      const writerMock = { write: jest.fn((_, __) => Promise.resolve()) };
      const builder = new HTML(<any>writerMock);

      await builder.build();

      expect(writerMock.write.mock.calls.length).toBe(1);
      expect(writerMock.write.mock.calls[0][0]).toBe('index.html');
    });
  });
});
