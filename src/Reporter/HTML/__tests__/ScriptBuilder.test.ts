import { ScriptBuilder } from '../ScriptBuilder';

jest.mock('esbuild', () => ({
  build: () =>
    Promise.resolve({
      outputFiles: [{ contents: new TextEncoder().encode('Hello') }],
    }),
}));

describe('ScriptBuilder', () => {
  describe('build', () => {
    it('should build javascript.', async () => {
      const builder = new ScriptBuilder();
      const actual = await builder.build('dummy');

      expect(actual).toBe('Hello');
    });
  });
});
