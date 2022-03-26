"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsFactory = void 0;
const path_1 = require("path");
const CognitiveComplexity_1 = require("../Analyzer/CodeMetricsCalculator/CognitiveComplexity/CognitiveComplexity");
const HalsteadBugsDelivered_1 = require("../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadBugsDelivered");
const HalsteadDifficulty_1 = require("../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadDifficulty");
const HalsteadEffort_1 = require("../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadEffort");
const HalsteadLength_1 = require("../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadLength");
const HalsteadTime_1 = require("../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadTime");
const HalsteadVocabulary_1 = require("../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadVocabulary");
const HalsteadVolume_1 = require("../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadVolume");
const LogicalLineOfCode_1 = require("../Analyzer/CodeMetricsCalculator/LineOfCode/MetricsValue/LogicalLineOfCode");
const PhysicalLineOfCode_1 = require("../Analyzer/CodeMetricsCalculator/LineOfCode/MetricsValue/PhysicalLineOfCode");
const Maintainability_1 = require("../Analyzer/CodeMetricsCalculator/Maintainability/Maintainability");
const CodePoint_1 = require("../Analyzer/Metrics/CodePoint");
const CodePointType_1 = require("../Analyzer/Metrics/CodePointType");
const Metrics_1 = require("../Analyzer/Metrics/Metrics");
const getDouble_1 = require("./getDouble");
class MetricsFactory {
    constructor() {
        this.separator = '|';
        this.metricsValueMap = new Map([
            ['CC', CognitiveComplexity_1.CognitiveComplexity],
            ['HB', HalsteadBugsDelivered_1.HalsteadBugsDelivered],
            ['HD', HalsteadDifficulty_1.HalsteadDifficulty],
            ['HE', HalsteadEffort_1.HalsteadEffort],
            ['HL', HalsteadLength_1.HalsteadLength],
            ['HT', HalsteadTime_1.HalsteadTime],
            ['HV', HalsteadVocabulary_1.HalsteadVocabulary],
            ['Hv', HalsteadVolume_1.HalsteadVolume],
            ['M', Maintainability_1.Maintainability],
            ['LL', LogicalLineOfCode_1.LogicalLineOfCode],
            ['LP', PhysicalLineOfCode_1.PhysicalLineOfCode],
        ]);
    }
    create(...DSLList) {
        return DSLList.map((DSL) => new Metrics_1.Metrics(this.createFile(DSL), this.createCodePoints(DSL), this.createMetricsValues(DSL)));
    }
    createFile(DSL) {
        var _a, _b;
        const fullPath = (_b = (_a = DSL.split(this.separator, 1)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
        return {
            fullPath,
            relativePath: fullPath,
            extension: (0, path_1.extname)(fullPath),
        };
    }
    createCodePoints(DSL) {
        var _a, _b;
        const [typeDSL, name, startLineNumber, endLineNumber] = ((_b = (_a = DSL.split(this.separator)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '').split(' ');
        const file = this.createFile(DSL);
        const result = [new CodePoint_1.CodePoint(CodePointType_1.CodePointType.File, file.fullPath, 0, 10000)];
        const args = [name, Number(startLineNumber), Number(endLineNumber)];
        switch (typeDSL) {
            case 'F':
                return [new CodePoint_1.CodePoint(CodePointType_1.CodePointType.File, ...args)];
            case 'C':
                result.push(new CodePoint_1.CodePoint(CodePointType_1.CodePointType.Class, ...args));
                break;
            case 'M':
                result.push(new CodePoint_1.CodePoint(CodePointType_1.CodePointType.Class, 'dummyClass', 0, 1000), new CodePoint_1.CodePoint(CodePointType_1.CodePointType.Method, ...args));
                break;
            case 'f':
                result.push(new CodePoint_1.CodePoint(CodePointType_1.CodePointType.Method, ...args));
                break;
        }
        return result;
    }
    createMetricsValues(DSL) {
        var _a, _b;
        const metricsValuesSeed = ((_b = (_a = DSL.split(this.separator)) === null || _a === void 0 ? void 0 : _a[2]) !== null && _b !== void 0 ? _b : '')
            .split(' ')
            .map((row) => row.split(':'))
            .map(([type, value]) => ({ type, value: Number(value) }));
        return metricsValuesSeed
            .filter(({ type }) => this.metricsValueMap.has(type))
            .map(({ type, value }) => (0, getDouble_1.getDouble)(this.metricsValueMap.get(type), { valueOf: value }));
    }
}
exports.MetricsFactory = MetricsFactory;
