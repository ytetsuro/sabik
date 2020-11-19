import { getDouble } from '../../../../../../TestHelpers/getDouble';
import { Analyzed } from '../../Repository/Analyzed';
import { SourceCode } from '../../Repository/SourceCode';
import { SourceCode as SourceCodeEntity } from '../../../Entity/SourceCode';
import { GetDetail } from '../GetDetail';

describe('GetDetail', () => {
  describe('.dispatch()', () => {
    it('should call listener.', (done) => {
      const event = new GetDetail(
        getDouble(Analyzed, {
          hasFileName: () => Promise.resolve(true),
          getByFileName: () => Promise.resolve(null),
        }),
        getDouble(SourceCode, {
          get: () => Promise.resolve(new SourceCodeEntity('', '')),
        })
      );

      event.listener((ev) => {
        expect(ev.isExists).toBe(true);
        expect(ev.fileMetrics).toBe(null);
        expect(ev.sourceCode).toBeInstanceOf(SourceCodeEntity);
        done();
      });

      event.dispatch('fileName.ts');
    });
  });
});
