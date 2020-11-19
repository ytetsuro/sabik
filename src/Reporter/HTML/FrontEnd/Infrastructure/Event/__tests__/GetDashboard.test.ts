import { getDouble } from '../../../../../../TestHelpers/getDouble';
import { Summary } from '../../../Entity/Summary';
import { Analyzed } from '../../Repository/Analyzed';
import { GetDashboard } from '../GetDashboard';

describe('GetDashboard', () => {
  describe('.dispatch()', () => {
    it('should call listener.', (done) => {
      const event = new GetDashboard(
        getDouble(Analyzed, {
          getSortedList: () => Promise.resolve([]),
        })
      );

      event.listener((ev) => {
        expect(ev.list).toStrictEqual([]);
        expect(ev.summary).toBeInstanceOf(Summary);
        done();
      });

      event.dispatch('Complexity');
    });
  });
});
