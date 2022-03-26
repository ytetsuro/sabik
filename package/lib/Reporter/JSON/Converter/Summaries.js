"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summaries = void 0;
const CognitiveComplexity_1 = require("../../../Analyzer/CodeMetricsCalculator/CognitiveComplexity/CognitiveComplexity");
const HalsteadBugsDelivered_1 = require("../../../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadBugsDelivered");
const LogicalLineOfCode_1 = require("../../../Analyzer/CodeMetricsCalculator/LineOfCode/MetricsValue/LogicalLineOfCode");
const Maintainability_1 = require("../../../Analyzer/CodeMetricsCalculator/Maintainability/Maintainability");
const CodePointType_1 = require("../../../Analyzer/Metrics/CodePointType");
const Metrics_1 = require("../../../Analyzer/Metrics/Metrics");
const MetricsCalculator_1 = require("../MetricsCalculator");
class Summaries {
    constructor(metrics) {
        this.summaries = new Map([
            ['LogicalLineOfCode(Sum)', ['file', 'sum', LogicalLineOfCode_1.LogicalLineOfCode]],
            ['LogicalLineOfCode(Average per file)', ['file', 'average', LogicalLineOfCode_1.LogicalLineOfCode]],
            ['LogicalLineOfCode(Average per method)', ['method', 'average', LogicalLineOfCode_1.LogicalLineOfCode]],
            ['CognitiveComplexity(Max)', ['method', 'max', CognitiveComplexity_1.CognitiveComplexity]],
            ['CognitiveComplexity(Average)', ['method', 'average', CognitiveComplexity_1.CognitiveComplexity]],
            ['Maintainability(Min)', ['method', 'min', Maintainability_1.Maintainability]],
            ['Maintainability(Average)', ['method', 'average', Maintainability_1.Maintainability]],
            ['BugDelivered(Sum)', ['method', 'sum', HalsteadBugsDelivered_1.HalsteadBugsDelivered]],
            ['BugDelivered(Average)', ['method', 'average', HalsteadBugsDelivered_1.HalsteadBugsDelivered]],
        ]);
        const calculator = new MetricsCalculator_1.MetricsCalculator(metrics);
        this.methodCalculator = calculator.filter(CodePointType_1.CodePointType.Method);
        this.fileCalculator = calculator.filter(CodePointType_1.CodePointType.File);
    }
    toJSON() {
        return [...this.summaries.entries()].reduce((summaries, [summaryName, args]) => ({
            ...summaries,
            [summaryName]: this.convertSummary(...args),
        }), {});
    }
    convertSummary(type, operation, metricsType) {
        const calculator = type === 'file' ? this.fileCalculator : this.methodCalculator;
        const value = (calculator[operation])(metricsType);
        if (value instanceof Metrics_1.Metrics) {
            return {
                name: value.getName(),
                value: Number(value.getMetricsByMetricsValue(metricsType)),
            };
        }
        return {
            value,
        };
    }
}
exports.Summaries = Summaries;
