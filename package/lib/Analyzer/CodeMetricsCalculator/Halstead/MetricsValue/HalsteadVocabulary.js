"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadVocabulary = void 0;
const MetricsType_1 = require("../../../Metrics/MetricsType");
class HalsteadVocabulary {
    constructor(operandAndOperator) {
        this.operandAndOperator = operandAndOperator;
        this.type = MetricsType_1.MetricsType.HalsteadVocabulary;
    }
    valueOf() {
        return this.operandAndOperator.getUniqueOperandCount() + this.operandAndOperator.getUniqueOperatorCount();
    }
}
exports.HalsteadVocabulary = HalsteadVocabulary;
