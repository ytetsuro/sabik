import { OperandAndOperator } from "../OperandAndOperator";

describe('Operand and operator class', () => {
    describe('should getUniqueOperatorCount method return is operator type count.', () => {
        it('should return is 3 when has 3 type operators.', () => {
            const operatorAndOperand = new OperandAndOperator(new Map(), new Map([['dummy', 1], ['dummy1', 1], ['dummy2', 1]]));

            expect(operatorAndOperand.getUniqueOperatorCount()).toBe(3);
        });
    });

    describe('should getUniqueOperandCount method return is operand type count.', () => {
        it('should return is 3 when has 3 type operands.', () => {
            const operatorAndOperand = new OperandAndOperator(new Map([['dummy', 1], ['dummy1', 1], ['dummy2', 1]]), new Map());

            expect(operatorAndOperand.getUniqueOperandCount()).toBe(3);
        });
    });

    describe('should getTotalOperatorCount method return is operator sum count.', () => {
        it('should return is 6 when has 3 type of 2 operators.', () => {
            const operatorAndOperand = new OperandAndOperator(new Map, new Map([['dummy', 2], ['dummy1', 2], ['dummy2', 2]]));

            expect(operatorAndOperand.getTotalOperatorCount()).toBe(6);
        });
    });

    describe('should getTotalOperandCount method return is operand sum count.', () => {
        it('should return is 6 when has 3 type of 2 operands.', () => {
            const operatorAndOperand = new OperandAndOperator(new Map([['dummy', 2], ['dummy1', 2], ['dummy2', 2]]), new Map());

            expect(operatorAndOperand.getTotalOperandCount()).toBe(6);
        });
    });
});