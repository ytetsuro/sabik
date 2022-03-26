"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analyzer = void 0;
const tslib_1 = require("tslib");
const Metrics_1 = require("./Metrics/Metrics");
const inversify_1 = require("inversify");
const Types_1 = require("../types/Types");
let Analyzer = class Analyzer {
    constructor(astNodeGenerator, calculatorForAST, calculatorForMetrics) {
        this.astNodeGenerator = astNodeGenerator;
        this.calculatorForAST = calculatorForAST;
        this.calculatorForMetrics = calculatorForMetrics;
        this.metricsMap = new Map();
    }
    analyze(files) {
        this.metricsMap.clear();
        const fileAndMetricsList = files.map((file) => ({
            file,
            astNode: this.astNodeGenerator.generate(file),
        }));
        this.astAnalyze(fileAndMetricsList);
        this.metricsAnalyze([...this.metricsMap.values()]);
        return [...this.metricsMap.values()];
    }
    metricsAnalyze(metricsList) {
        const analyzedMetricsList = this.calculatorForMetrics.flatMap((analyzer) => analyzer.analyze(metricsList));
        this.setMetricsList(analyzedMetricsList);
    }
    astAnalyze(fileAndMetricsList) {
        const metricsList = this.calculatorForAST.flatMap((analyzer) => analyzer.analyze(fileAndMetricsList));
        this.setMetricsList(metricsList);
    }
    setMetricsList(metricsList) {
        metricsList.forEach((metrics) => {
            var _a;
            const minimalCodePoint = metrics.getMinimalCodePoint();
            const currentMetrics = (_a = this.metricsMap.get(minimalCodePoint)) !== null && _a !== void 0 ? _a : new Metrics_1.Metrics(metrics.file, metrics.codePoints, []);
            this.metricsMap.set(minimalCodePoint, currentMetrics.merge(metrics));
        });
    }
};
Analyzer = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Types_1.Types.astNodeGenerator)),
    (0, tslib_1.__param)(1, (0, inversify_1.multiInject)(Types_1.Types.codeMetricsCalculatorForAST)),
    (0, tslib_1.__param)(2, (0, inversify_1.multiInject)(Types_1.Types.codeMetricsCalculatorForMetrics)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Array, Array])
], Analyzer);
exports.Analyzer = Analyzer;
