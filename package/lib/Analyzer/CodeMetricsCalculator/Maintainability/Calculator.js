"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const tslib_1 = require("tslib");
const Maintainability_1 = require("./Maintainability");
const HalsteadVolume_1 = require("../Halstead/MetricsValue/HalsteadVolume");
const CognitiveComplexity_1 = require("../CognitiveComplexity/CognitiveComplexity");
const LogicalLineOfCode_1 = require("../LineOfCode/MetricsValue/LogicalLineOfCode");
const Metrics_1 = require("../../Metrics/Metrics");
const CodePointType_1 = require("../../Metrics/CodePointType");
const inversify_1 = require("inversify");
let Calculator = class Calculator {
    constructor() {
        this.targetMetrics = [HalsteadVolume_1.HalsteadVolume, LogicalLineOfCode_1.LogicalLineOfCode, CognitiveComplexity_1.CognitiveComplexity];
    }
    analyze(metricsList) {
        return metricsList
            .filter((metrics) => { var _a; return ((_a = metrics.getMinimalCodePoint()) === null || _a === void 0 ? void 0 : _a.type) === CodePointType_1.CodePointType.Method; })
            .filter((metrics) => metrics.hasMetricsValue(...this.targetMetrics))
            .map((metrics) => ({
            file: metrics.file,
            codePoints: metrics.codePoints,
            values: this.targetMetrics.map((row) => metrics.getMetricsByMetricsValue(row)),
        }))
            .map(({ file, codePoints, values }) => new Metrics_1.Metrics(file, codePoints, this.calculate(values)));
    }
    calculate(metricsList) {
        const halsteadVolume = metricsList.find((row) => row instanceof HalsteadVolume_1.HalsteadVolume);
        const logicalLineOfCode = metricsList.find((row) => row instanceof LogicalLineOfCode_1.LogicalLineOfCode);
        const cognitiveComplexity = metricsList.find((row) => row instanceof CognitiveComplexity_1.CognitiveComplexity);
        return [new Maintainability_1.Maintainability(halsteadVolume, cognitiveComplexity, logicalLineOfCode)];
    }
};
Calculator = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], Calculator);
exports.Calculator = Calculator;
