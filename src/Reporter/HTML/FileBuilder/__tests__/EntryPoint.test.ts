import { ScriptBuilder } from '../../ScriptBuilder';
import { EntryPoint } from '../EntryPoint';

jest.mock('../../ScriptBuilder', () => ({
  ScriptBuilder: jest.fn().mockImplementation(() => ({
    build: jest.fn((_) => Promise.resolve('unitTest')),
  })),
}));

describe('EntryPoint', () => {
  describe('.build()', () => {
    it('should create entry point js.', async () => {
      const scriptBuilder = new ScriptBuilder();
      const writerMock = { write: jest.fn((_, __) => Promise.resolve()) };
      const entryPoint = new EntryPoint(<any>writerMock, scriptBuilder);

      await entryPoint.build();

      expect(writerMock.write.mock.calls[0][0]).toBe('app.js');
      expect(writerMock.write.mock.calls[0][1]).toBe('unitTest');
    });
  });
});
