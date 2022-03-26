"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalLineOfCode = void 0;
const MetricsType_1 = require("../../../Metrics/MetricsType");
class PhysicalLineOfCode {
    constructor(lineOfCode) {
        this.lineOfCode = lineOfCode;
        this.type = MetricsType_1.MetricsType.PhysicalLineOfCode;
    }
    valueOf() {
        return this.lineOfCode;
    }
}
exports.PhysicalLineOfCode = PhysicalLineOfCode;
