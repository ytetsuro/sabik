import { ComplexityStore } from "../ComplexityStore";
import { Complexity } from '../Complexity';

describe('Complexity Store Class', () => {
    describe('.getAll().', () => {
        it('return Complexities', () => {
            const expected = [new Complexity(createDummyNode('I'), 0)];
            const complexityStore = new ComplexityStore(expected);

            expect(complexityStore.getAll()).toStrictEqual(expected);
        });
    });

    describe('.valueOf()', () => {
        it('return sum complexities', () => {
            const complexityStore = new ComplexityStore([
                new Complexity(createDummyNode('I'), 0),
                new Complexity(createDummyNode('IN'), 2),
            ]);

            expect(complexityStore.valueOf()).toStrictEqual(4);
        });
    });


    describe('.toJSON()', () => {
        it('return sum complexity and Complexities', () => {
            const complexityStore = new ComplexityStore([
                new Complexity(createDummyNode('I'), 0),
                new Complexity(createDummyNode('IN'), 2),
            ]);

            expect(JSON.stringify(complexityStore))
                .toBe('{"complexity":4,"items":[{"complexity":1,"nestDeepCount":0},{"complexity":1,"nestDeepCount":2}]}');
        });
    });
});

const createDummyNode = (DSL: string) => ({
    isIncrement: () => DSL.includes('I'),
    isNestLevelUp: () => DSL.includes('N'),
    isNestingIncrement: () => DSL.includes('I') && DSL.includes('N'),
    getChilds: () => [],
});