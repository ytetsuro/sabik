import { Calculator } from "../Calculator";
import { HalsteadCountableNode } from '../../../TestHelpers/HalsteadCountableNode';

describe('Halstead Calculator', () => {
    let calculator: Calculator;

    beforeAll(() => {
        calculator = new Calculator();
    });

    describe('should count operand.', () => {
        it('should length is 1 when root node is operand node.', () => {
            const actual = calculator.calculate(new HalsteadCountableNode({DSL: 'N', text: 'dummy'}));

            expect(actual.getLength()).toBe(1);
        });

        it('should length is 1 when child node is operand node.', () => {
            const actual = calculator.calculate(new HalsteadCountableNode({
                DSL: '',
                text: 'Dummy',
                childs: [{DSL: 'N', text: 'Dummy'}]
            }));

            expect(actual.getLength()).toBe(1);
        });

        it('should length is 2, and vocabulary is 1 when parent node is `dummy` text operand, child node is `dummy` text operand.', () => {
            const actual = calculator.calculate(new HalsteadCountableNode({
                DSL: 'N',
                text: 'dummy',
                childs: [{DSL: 'N', text: 'dummy'}]
            }));

            expect(actual.getLength()).toBe(2);
            expect(actual.getVocabulary()).toBe(1);
        });
    });

    describe('should count operator', () => {
        it('should length is 1 when root node is operator node.', () => {
            const actual = calculator.calculate(new HalsteadCountableNode({DSL: 'T', text: 'dummy'}));

            expect(actual.getLength()).toBe(1);
        });

        it('should length is 1 when child node is operator node.', () => {
            const actual = calculator.calculate(new HalsteadCountableNode({
                DSL: '',
                text: 'Dummy',
                childs: [{DSL: 'T', text: 'Dummy'}]
            }));

            expect(actual.getLength()).toBe(1);
        });

        it('should length is 2, and vocabulary is 1 when parent node is `dummy` text operator, child node is `dummy` text operator.', () => {
            const actual = calculator.calculate(new HalsteadCountableNode({
                DSL: 'T',
                text: 'dummy',
                childs: [{DSL: 'T', text: 'dummy'}]
            }));

            expect(actual.getLength()).toBe(2);
            expect(actual.getVocabulary()).toBe(1);
        });
    });

    describe('should count operator and operand', () => {
        it('should length is 5, and vocabulary is 3 when parent node is `dummy` text operand, child node has tow operator and tow operand.', () => {
            const actual = calculator.calculate(new HalsteadCountableNode({
                DSL: 'T',
                text: 'dummy',
                childs: [
                    {DSL: 'N', text: 'operator'},
                    {DSL: 'N', text: 'operator', childs: [
                        {DSL: 'T', text: 'operand'},
                        {DSL: 'T', text: 'operand'},
                    ]}
                ]
            }));

            expect(actual.getLength()).toBe(5);
            expect(actual.getVocabulary()).toBe(3);
        });
    });
});