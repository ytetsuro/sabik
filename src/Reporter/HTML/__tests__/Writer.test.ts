import { Writer } from '../Writer';
import { mkdirSync, writeFileSync, existsSync, statSync } from 'fs';

jest.mock('fs');

describe('Writer', () => {
  beforeEach(() => {
    (<jest.Mock>existsSync).mockClear();
    (<jest.Mock>statSync).mockClear();
  });

  describe('.constructor', () => {
    it('should throw error when not directory.', async () => {
      (<jest.Mock>existsSync).mockReturnValueOnce(true);
      (<jest.Mock>statSync).mockReturnValueOnce({ isDirectory: () => false });
      let isThrows = false;

      try {
        new Writer(__filename);
      } catch (_) {
        isThrows = true;
      }

      expect(isThrows).toBe(true);
    });
  });

  describe('.write', () => {
    it('should create directory and writer.', async () => {
      const writer = new Writer('/foo/bar');
      await writer.write('baz/bazz.js', 'dummy');

      expect((<jest.Mock>mkdirSync).mock.calls[0]).toEqual(['/foo/bar/baz', { recursive: true }]);
      expect((<jest.Mock>writeFileSync).mock.calls[0]).toEqual(['/foo/bar/baz/bazz.js', 'dummy']);
    });
  });
});
