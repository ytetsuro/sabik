"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandAndOperator = void 0;
class OperandAndOperator {
    constructor(operands, operators) {
        this.operands = operands;
        this.operators = operators;
    }
    getUniqueOperatorCount() {
        return this.operators.size;
    }
    getUniqueOperandCount() {
        return this.operands.size;
    }
    getTotalOperatorCount() {
        return [...this.operators.values()].reduce((prev, next) => prev + next, 0);
    }
    getTotalOperandCount() {
        return [...this.operands.values()].reduce((prev, next) => prev + next, 0);
    }
}
exports.OperandAndOperator = OperandAndOperator;
