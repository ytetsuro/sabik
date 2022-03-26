"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsCalculator = void 0;
const decimal_js_1 = require("decimal.js");
const CodePointType_1 = require("../../Analyzer/Metrics/CodePointType");
class MetricsCalculator {
    constructor(metrics) {
        this.metrics = metrics;
    }
    filter(seed) {
        let callback = seed;
        if (callback instanceof CodePointType_1.CodePointType) {
            callback = (metrics) => metrics.getMinimalCodePoint().type === seed;
        }
        return new MetricsCalculator(this.metrics.filter(callback));
    }
    sum(metricsValueConstructor) {
        return this.metrics
            .map((metrics) => metrics.getMetricsByMetricsValue(metricsValueConstructor))
            .filter((metrics) => !!metrics)
            .reduce((sum, metrics) => sum.plus(new decimal_js_1.Decimal(Number(metrics))), new decimal_js_1.Decimal(0))
            .toNumber();
    }
    average(metricsValueConstructor) {
        return new decimal_js_1.Decimal(this.sum(metricsValueConstructor))
            .div(this.metrics.filter((metrics) => metrics.hasMetricsValue(metricsValueConstructor)).length)
            .toNumber();
    }
    max(identity) {
        var _a;
        return ((_a = this.metrics
            .filter((metrics) => metrics.hasMetricsValue(identity))
            .reduce((max, metrics) => {
            var _a;
            return Number((_a = max === null || max === void 0 ? void 0 : max.getMetricsByMetricsValue(identity)) !== null && _a !== void 0 ? _a : -Infinity) >
                Number(metrics.getMetricsByMetricsValue(identity))
                ? max
                : metrics;
        })) !== null && _a !== void 0 ? _a : null);
    }
    min(identity) {
        var _a;
        return ((_a = this.metrics
            .filter((metrics) => metrics.hasMetricsValue(identity))
            .reduce((min, metrics) => {
            var _a;
            return Number((_a = min === null || min === void 0 ? void 0 : min.getMetricsByMetricsValue(identity)) !== null && _a !== void 0 ? _a : Infinity) <
                Number(metrics.getMetricsByMetricsValue(identity))
                ? min
                : metrics;
        })) !== null && _a !== void 0 ? _a : null);
    }
}
exports.MetricsCalculator = MetricsCalculator;
