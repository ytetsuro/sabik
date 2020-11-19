import { getDouble } from '../../../../../../TestHelpers/getDouble';
import { ResourceLoader } from '../../ResourceLoader';
import { SourceCode } from '../SourceCode';

describe('SourceCode', () => {
  let repository: SourceCode;

  beforeAll(() => {
    repository = new SourceCode(
      getDouble(ResourceLoader, {
        load: () => Promise.resolve('dummy'),
      })
    );
  });

  describe('.get()', () => {
    it('should get sourceCode.', async () => {
      const actual = await repository.get('hello.ts');

      expect(actual.filePath).toBe('hello.ts');
      expect(actual.sourceCode).toBe('dummy');
      expect(actual.extension).toBe('ts');
    });
  });
});
