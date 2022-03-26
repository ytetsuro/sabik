"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintainability = void 0;
const decimal_js_1 = require("decimal.js");
const MetricsType_1 = require("../../Metrics/MetricsType");
class Maintainability {
    constructor(halsteadVolume, complexity, logicalLineOfCode) {
        this.halsteadVolume = halsteadVolume;
        this.complexity = complexity;
        this.logicalLineOfCode = logicalLineOfCode;
        this.type = MetricsType_1.MetricsType.Maintainability;
    }
    valueOf() {
        const halstead = new decimal_js_1.Decimal(5.2).mul(decimal_js_1.Decimal.log(Number(this.halsteadVolume)));
        const complexity = new decimal_js_1.Decimal(0.23).mul(Number(this.complexity));
        const logicalLineOfCode = new decimal_js_1.Decimal(16.2).mul(decimal_js_1.Decimal.log(Number(this.logicalLineOfCode)));
        const maintainability = new decimal_js_1.Decimal(171)
            .minus(halstead)
            .minus(complexity)
            .minus(logicalLineOfCode)
            .mul(100)
            .div(171);
        return Math.min(Math.max(0, Number(maintainability)), 100);
    }
}
exports.Maintainability = Maintainability;
