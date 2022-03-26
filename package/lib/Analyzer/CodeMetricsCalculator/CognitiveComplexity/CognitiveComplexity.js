"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitiveComplexity = void 0;
const MetricsType_1 = require("../../Metrics/MetricsType");
class CognitiveComplexity {
    constructor(complexities) {
        this.complexities = complexities;
        this.type = MetricsType_1.MetricsType.CognitiveComplexity;
    }
    valueOf() {
        return this.complexities.reduce((prev, next) => Number(prev) + Number(next), 0);
    }
}
exports.CognitiveComplexity = CognitiveComplexity;
