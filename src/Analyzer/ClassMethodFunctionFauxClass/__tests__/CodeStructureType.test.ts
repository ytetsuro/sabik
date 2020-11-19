import { CodeStructureType } from '../CodeStructureType';

describe('Code structure type Class', () => {
  describe('should isClass method return is class can discren.', () => {
    it.each([CodeStructureType.CLASS, CodeStructureType.FAUX_CLASS])(
      'should returns true when class type.',
      (structure) => {
        expect(structure.isClass()).toBe(true);
      }
    );

    it('should return false when not class type', () => {
      expect(CodeStructureType.METHOD.isClass()).toBe(false);
    });
  });
});
