"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadBugsDelivered = void 0;
const decimal_js_1 = require("decimal.js");
const MetricsType_1 = require("../../../Metrics/MetricsType");
class HalsteadBugsDelivered {
    constructor(volume) {
        this.volume = volume;
        this.type = MetricsType_1.MetricsType.HalsteadBugsDelivered;
    }
    valueOf() {
        return new decimal_js_1.Decimal(Number(this.volume)).div(3000).toNumber();
    }
}
exports.HalsteadBugsDelivered = HalsteadBugsDelivered;
