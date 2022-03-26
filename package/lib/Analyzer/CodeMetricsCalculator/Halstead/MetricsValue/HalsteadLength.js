"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadLength = void 0;
const MetricsType_1 = require("../../../Metrics/MetricsType");
class HalsteadLength {
    constructor(operandAndOperator) {
        this.operandAndOperator = operandAndOperator;
        this.type = MetricsType_1.MetricsType.HalsteadLength;
    }
    valueOf() {
        return this.operandAndOperator.getTotalOperandCount() + this.operandAndOperator.getTotalOperatorCount();
    }
}
exports.HalsteadLength = HalsteadLength;
