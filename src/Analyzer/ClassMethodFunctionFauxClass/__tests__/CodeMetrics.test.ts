import { CodeMetrics } from '../CodeMetrics';
import { CodeStructureType } from '../CodeStructureType';

describe('Code metrics class.', () => {
  describe('should can not instance when has method structure count is not one.', () => {
    it('should throw Error when not found method structure.', () => {
      let isThrows = false;

      try {
        const metrics = new CodeMetrics([], 2);
      } catch (_) {
        isThrows = true;
      }

      expect(isThrows).toBe(true);
    });

    it('should throw Error when has greater than one method structure.', () => {
      let isThrows = false;

      try {
        const metrics = new CodeMetrics(
          [
            {
              name: 'method',
              type: CodeStructureType.METHOD,
              startLineNumber: 2,
              endLineNumber: 5,
            },
            {
              name: 'method2',
              type: CodeStructureType.METHOD,
              startLineNumber: 6,
              endLineNumber: 8,
            },
          ],
          2
        );
      } catch (_) {
        isThrows = true;
      }

      expect(isThrows).toBe(true);
    });
  });

  describe('should getClassCodeStructure is extract class.', () => {
    it('shold return first found class structure when has one class and one faux class and one method.', () => {
      const metrics = new CodeMetrics(
        [
          {
            name: 'class',
            type: CodeStructureType.CLASS,
            startLineNumber: 0,
            endLineNumber: 20,
          },
          {
            name: 'fauxClass',
            type: CodeStructureType.FAUX_CLASS,
            startLineNumber: 3,
            endLineNumber: 6,
          },
          {
            name: 'method',
            type: CodeStructureType.METHOD,
            startLineNumber: 8,
            endLineNumber: 19,
          },
        ],
        2
      );

      expect(metrics.getClassCodeStructure()).toStrictEqual({
        name: 'class',
        type: CodeStructureType.CLASS,
        startLineNumber: 0,
        endLineNumber: 20,
      });
    });
  });

  describe('should getMethodCodeStructure is extract methods.', () => {
    it('shold return first found method structure when has one class and one faux class and one method.', () => {
      const metrics = new CodeMetrics(
        [
          {
            name: 'class',
            type: CodeStructureType.CLASS,
            startLineNumber: 0,
            endLineNumber: 20,
          },
          {
            name: 'fauxClass',
            type: CodeStructureType.FAUX_CLASS,
            startLineNumber: 3,
            endLineNumber: 6,
          },
          {
            name: 'method',
            type: CodeStructureType.METHOD,
            startLineNumber: 8,
            endLineNumber: 19,
          },
        ],
        2
      );

      expect(metrics.getMethodCodeStructure()).toStrictEqual({
        name: 'method',
        type: CodeStructureType.METHOD,
        startLineNumber: 8,
        endLineNumber: 19,
      });
    });
  });
});
