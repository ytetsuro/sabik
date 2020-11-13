import { Halstead } from "../Halstead";
import { OperandAndOperator } from '../OperandAndOperator';

describe('Halstead complexity measures Class.', () => {
    describe('should getLength method return is operand and operator length.', () => {
        it('should return 2 when one vocabulary 2 operator.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map, new Map([['dummy', 2]])));

            expect(halstead.getLength()).toBe(2);
        });

        it('should return 2 when one vocabulary 2 operand.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy', 2]]), new Map));

            expect(halstead.getLength()).toBe(2);
        });

        it('should return 3 when one vocabulary 2 operator, and one vocabulary 1 operand.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy', 1]]), new Map([['dummy', 2]])));

            expect(halstead.getLength()).toBe(3);
        });
    });

    describe('should getVocabulary method return is operand and operator vocabulary.', () => {
        it('should return 1 when one vocabulary 2 operator.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map, new Map([['dummy', 2]])));

            expect(halstead.getVocabulary()).toBe(1);
        });

        it('should return 1 when one vocabulary 2 operand.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy', 2]]), new Map));

            expect(halstead.getVocabulary()).toBe(1);
        });

        it('should return 3 when two vocabulary operator, and one vocabulary operand.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy', 1], ['dummy2', 1]]), new Map([['dummy', 2]])));

            expect(halstead.getVocabulary()).toBe(3);
        });
    });

    describe('should getVolume method return is length multiplied by log2 vocabulary.', () => {
        it('should return 4.754887502163468 when three vocabulary, 3 length.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy1', 1], ['dummy2', 1]]), new Map([['dummy', 1]])));

            expect(halstead.getVolume()).toBe(4.754887502163468);
        });
    });

    describe('should getDifficulty method return is (operators vocabulary / 2) * (operands vocabulary / operands length).', () => {
        it('should return 0.25 when operands has two vocabulary 4 length, and operator has one vocabulary 1 length.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy1', 2], ['dummy2', 2]]), new Map([['dummy', 1]])));

            expect(halstead.getDifficulty()).toBe(0.25);
        });
    });

    describe('should getEffort method return is difficulty * volume.', () => {
        it('should return 1.981203125901445 when volume is 7.92481250360578 and difficulty is 0.25.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy1', 2], ['dummy2', 2]]), new Map([['dummy', 1]])));

            expect(halstead.getEffort()).toBe(1.981203125901445);
        });
    });

    describe('should getTime method return is effort / 18.', () => {
        it('should return 0.11006684032785806 when effort is 1.981203125901445.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy1', 2], ['dummy2', 2]]), new Map([['dummy', 1]])));

            expect(halstead.getTime()).toBe(0.11006684032785806);
        });
    });

    describe('should getBugsDelivered method return is volume / 3000.', () => {
        it('should return 0.001584962500721156 when volume is 4.754887502163468.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy1', 1], ['dummy2', 1]]), new Map([['dummy', 1]])));

            expect(halstead.getBugsDelivered()).toBe(0.001584962500721156);
        });
    });

    describe('should getBugsDelivered method return is volume.', () => {
        it('should return 4.754887502163468 when volume is 4.754887502163468.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy1', 1], ['dummy2', 1]]), new Map([['dummy', 1]])));

            expect(halstead.valueOf()).toBe(4.754887502163468);
        });
    });

    describe('should cast JSON.', () => {
        it('should return all values.', () => {
            const halstead = new Halstead(new OperandAndOperator(new Map([['dummy1', 1], ['dummy2', 1]]), new Map([['dummy', 1]])));

            expect(JSON.stringify(halstead))
                .toBe('{"operands":[["dummy1",1],["dummy2",1]],"operators":[["dummy",1]],"volume":4.754887502163468,"length":3,"vocabulary":3,"difficulty":0.25,"effort":1.188721875540867,"time":0.06604010419671484,"bugsDelivered":0.001584962500721156}');
        });
    })
});