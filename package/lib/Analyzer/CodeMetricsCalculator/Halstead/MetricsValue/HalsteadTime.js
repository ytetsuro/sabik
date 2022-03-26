"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadTime = void 0;
const decimal_js_1 = require("decimal.js");
const MetricsType_1 = require("../../../Metrics/MetricsType");
class HalsteadTime {
    constructor(effort) {
        this.effort = effort;
        this.type = MetricsType_1.MetricsType.HalsteadTime;
    }
    valueOf() {
        return new decimal_js_1.Decimal(Number(this.effort)).div(18).toNumber();
    }
}
exports.HalsteadTime = HalsteadTime;
