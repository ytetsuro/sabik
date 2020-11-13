import { Complexity } from "../Complexity";

describe('Complexity Class', () => {
    describe('should act like number when is increment node.', () => {
        it('should act like 1 when deep count is 0, and increment node.', () => {
            const complexity = new Complexity(createDummyNode('I'), 0);

            expect(Number(complexity)).toBe(1);
        });

        it('should act like 1 when deep count is 1, and increment node.', () => {
            const complexity = new Complexity(createDummyNode('I'), 1);

            expect(Number(complexity)).toBe(1);
        });

        it('should act like 0 when deep count is 0, and not increment node.', () => {
            const complexity = new Complexity(createDummyNode(''), 0);

            expect(Number(complexity)).toBe(0);
        });

        it('should act like 0 when deep count is 1, and not increment node.', () => {
            const complexity = new Complexity(createDummyNode(''), 0);

            expect(Number(complexity)).toBe(0);
        });

        it('should act like 2 when deep count is 1, and nesting increment node.', () => {
            const complexity = new Complexity(createDummyNode('IN'), 1);

            expect(Number(complexity)).toBe(2);
        });
    });
});

const createDummyNode = (DSL: string) => ({
    isIncrement: () => DSL.includes('I'),
    isNestLevelUp: () => DSL.includes('N'),
    isNestingIncrement: () => DSL.includes('I') && DSL.includes('N'),
    getChilds: () => [],
});