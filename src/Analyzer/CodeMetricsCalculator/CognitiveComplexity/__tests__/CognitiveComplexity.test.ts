import { CognitiveComplexity } from '../CognitiveComplexity';
import { ComplexityIncrement } from '../ComplexityIncrement';

describe('Complexity Store Class', () => {
  describe('.valueOf()', () => {
    it('return sum complexities', () => {
      const complexityStore = new CognitiveComplexity([
        new ComplexityIncrement(createDummyNode('I'), 0),
        new ComplexityIncrement(createDummyNode('IN'), 2),
      ]);

      expect(complexityStore.valueOf()).toStrictEqual(4);
    });
  });
});

const createDummyNode = (DSL: string) => ({
  isIncrement: () => DSL.includes('I'),
  isNestLevelUp: () => DSL.includes('N'),
  isNestingIncrement: () => DSL.includes('I') && DSL.includes('N'),
  getChildren: () => [],
});
