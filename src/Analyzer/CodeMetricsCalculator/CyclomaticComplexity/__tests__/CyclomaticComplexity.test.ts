import { CyclomaticComplexity } from '../CyclomaticComplexity';
import { ComplexityIncrement } from '../ComplexityIncrement';

describe('Complexity Store Class', () => {
  describe('.valueOf()', () => {
    it('return sum complexities', () => {
      const complexityStore = new CyclomaticComplexity([
        new ComplexityIncrement(createDummyNode('I')),
        new ComplexityIncrement(createDummyNode('I')),
      ]);

      expect(complexityStore.valueOf()).toStrictEqual(2);
    });
  });
});

const createDummyNode = (DSL: string) => ({
  isIncrement: () => DSL.includes('I'),
  getChildren: () => [],
});
