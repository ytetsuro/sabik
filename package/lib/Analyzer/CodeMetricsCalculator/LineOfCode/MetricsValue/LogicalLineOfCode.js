"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicalLineOfCode = void 0;
const MetricsType_1 = require("../../../Metrics/MetricsType");
class LogicalLineOfCode {
    constructor(lineOfCode) {
        this.lineOfCode = lineOfCode;
        this.type = MetricsType_1.MetricsType.LogicalLineOfCode;
    }
    valueOf() {
        return this.lineOfCode;
    }
}
exports.LogicalLineOfCode = LogicalLineOfCode;
