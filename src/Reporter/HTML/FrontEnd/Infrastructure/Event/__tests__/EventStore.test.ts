import { EventStore } from '../EventStore';
import { SelectMetrics } from '../SelectMetrics';

describe('EventStore', () => {
  describe('.get()', () => {
    it('should get event class.', () => {
      const actual = EventStore.get(SelectMetrics);

      expect(actual).toBeInstanceOf(SelectMetrics);
    });
  });
});
