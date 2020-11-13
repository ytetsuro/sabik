import { SelectMetrics } from '../SelectMetrics';

describe('SelectDetail', () => {
    describe('.dispatch()', () => {
        it('should call listener.', (done) => {
            const event = new SelectMetrics();

            event.listener((ev) => {
                expect(ev).toBe(null);
                done();
            });

            event.dispatch(null);
        })
    });
});