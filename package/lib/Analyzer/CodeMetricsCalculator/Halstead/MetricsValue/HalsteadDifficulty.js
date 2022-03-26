"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadDifficulty = void 0;
const decimal_js_1 = require("decimal.js");
const MetricsType_1 = require("../../../Metrics/MetricsType");
class HalsteadDifficulty {
    constructor(operandAndOperator) {
        this.operandAndOperator = operandAndOperator;
        this.type = MetricsType_1.MetricsType.HalsteadDifficulty;
    }
    valueOf() {
        const uniqueOperatorCount = new decimal_js_1.Decimal(this.operandAndOperator.getUniqueOperatorCount());
        const totalOperatorCount = new decimal_js_1.Decimal(this.operandAndOperator.getTotalOperatorCount());
        const uniqueOperandCount = new decimal_js_1.Decimal(this.operandAndOperator.getUniqueOperandCount());
        return uniqueOperatorCount.div(2).mul(totalOperatorCount.div(uniqueOperandCount)).toNumber();
    }
}
exports.HalsteadDifficulty = HalsteadDifficulty;
