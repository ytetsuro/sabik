import { Analyzed } from '../Analyzed';
import { LineOfCode } from '../../../Calculator/LineOfCode/LineOfCode';

describe('Analyzed per file.', () => {
  describe('toJSON()', () => {
    it('should can cast JSON.', () => {
      const analyzed = new Analyzed('dummyFile', [], new LineOfCode(2, 1));

      expect(JSON.stringify(analyzed)).toBe(
        '{"fileName":"dummyFile","lineOfCode":{"physical":2,"logical":1},"metrics":[]}'
      );
    });
  });
});
