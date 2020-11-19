import { getDouble } from '../../../../../../TestHelpers/getDouble';
import { FileMetrics } from '../../Converter/FileMetrics';
import { Metrics } from '../../Converter/Metrics';
import { ResourceLoader } from '../../ResourceLoader';
import { Analyzed } from '../Analyzed';
import { fixture } from './fixtures/analyzed';

describe('Analyzed', () => {
  let repository: Analyzed;
  beforeAll(() => {
    repository = new Analyzed(
      getDouble(ResourceLoader, {
        load: () => Promise.resolve(JSON.stringify(fixture)),
      }),
      new FileMetrics(new Metrics())
    );
  });

  describe('.getByFileName()', () => {
    it('should get metrics match filename.', async () => {
      const metrics = await repository.getByFileName('maxComplexity.ts');

      expect(metrics?.fileName).toBe('maxComplexity.ts');
    });

    it('should get null when not match filename.', async () => {
      const metrics = await repository.getByFileName('dummy.ts');

      expect(metrics).toBe(null);
    });
  });

  describe('.hasFileName()', () => {
    it('should returns true when match filename.', async () => {
      const isExists = await repository.hasFileName('maxComplexity.ts');

      expect(isExists).toBe(true);
    });

    it('should return false when not match filename.', async () => {
      const isExists = await repository.hasFileName('dummy.ts');

      expect(isExists).toBe(false);
    });
  });

  describe('.getSortedList()', () => {
    it('should get complexity sorted list.', async () => {
      const list = await repository.getSortedList('Complexity');

      expect(list.map((row) => row.fileName)).toStrictEqual([
        'maxComplexity.ts',
        'maxBugsDelivered.ts',
        'minMaintainability.ts',
      ]);
    });

    it('should get bugsDelivered sorted list.', async () => {
      const list = await repository.getSortedList('BugsDelivered');

      expect(list.map((row) => row.fileName)).toStrictEqual([
        'maxBugsDelivered.ts',
        'minMaintainability.ts',
        'maxComplexity.ts',
      ]);
    });

    it('should get maintainability sorted list.', async () => {
      const list = await repository.getSortedList('Maintainability');

      expect(list.map((row) => row.fileName)).toStrictEqual([
        'minMaintainability.ts',
        'maxComplexity.ts',
        'maxBugsDelivered.ts',
      ]);
    });
  });
});
