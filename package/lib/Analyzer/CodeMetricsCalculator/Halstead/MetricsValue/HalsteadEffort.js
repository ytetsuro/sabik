"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadEffort = void 0;
const decimal_js_1 = require("decimal.js");
const MetricsType_1 = require("../../../Metrics/MetricsType");
class HalsteadEffort {
    constructor(volume, difficulty) {
        this.volume = volume;
        this.difficulty = difficulty;
        this.type = MetricsType_1.MetricsType.HalsteadEffort;
    }
    valueOf() {
        const volume = new decimal_js_1.Decimal(Number(this.volume));
        const difficulty = new decimal_js_1.Decimal(Number(this.difficulty));
        return volume.mul(difficulty).toNumber();
    }
}
exports.HalsteadEffort = HalsteadEffort;
