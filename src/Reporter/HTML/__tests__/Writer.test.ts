import { Writer } from '../Writer';
import { mkdirSync, writeFileSync } from 'fs';

jest.mock('fs');

describe('Writer', () => {
  describe('.write', () => {
    it('should create directory and writer.', async () => {
      const writer = new Writer('/foo/bar');
      await writer.write('baz/bazz.js', 'dummy');

      expect((<jest.Mock>mkdirSync).mock.calls[0]).toEqual([
        '/foo/bar/baz',
        { recursive: true },
      ]);
      expect((<jest.Mock>writeFileSync).mock.calls[0]).toEqual([
        '/foo/bar/baz/bazz.js',
        'dummy',
      ]);
    });
  });
});
