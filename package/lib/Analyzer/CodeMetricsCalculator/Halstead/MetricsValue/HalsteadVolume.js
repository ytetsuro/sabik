"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadVolume = void 0;
const decimal_js_1 = require("decimal.js");
const MetricsType_1 = require("../../../Metrics/MetricsType");
class HalsteadVolume {
    constructor(length, vocabulary) {
        this.length = length;
        this.vocabulary = vocabulary;
        this.type = MetricsType_1.MetricsType.HalsteadVolume;
    }
    valueOf() {
        return new decimal_js_1.Decimal(Number(this.length)).mul(decimal_js_1.Decimal.log2(Number(this.vocabulary))).toNumber();
    }
}
exports.HalsteadVolume = HalsteadVolume;
