import { Calculator } from "..//Calculator";
import { LineOfCodeCountableNode } from '../../../TestHelpers/LineOfCodeCountableNode';

describe('Line of code Calculator Class.', () => {
    it('should count line by code', () => {
        const calculator = new Calculator();
        const actual = calculator.calculate(
            new LineOfCodeCountableNode(`
            // this is Test Code
            if (true) 
            {
                return 1;
            }`)
        );

        expect(actual.logical).toBe(4);
        expect(actual.physical).toBe(6);
    });
});