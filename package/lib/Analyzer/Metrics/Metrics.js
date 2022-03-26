"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
class Metrics {
    constructor(file, codePoints, metricsValues) {
        this.file = file;
        this.codePoints = codePoints;
        this.metricsValues = metricsValues;
    }
    hasMetricsValue(...values) {
        return values.every((constructor) => this.getMetricsByMetricsValue(constructor) !== null);
    }
    getMetricsByMetricsValue(constructor) {
        var _a;
        return (_a = this.metricsValues.find((metricsValue) => metricsValue instanceof constructor)) !== null && _a !== void 0 ? _a : null;
    }
    merge(metrics) {
        return new Metrics(this.file, this.codePoints, [...metrics.metricsValues, ...this.metricsValues]);
    }
    getMinimalCodePoint() {
        return this.codePoints.reduce((current, row) => { var _a, _b, _c; return (((_c = (_b = (_a = current === null || current === void 0 ? void 0 : current.type) === null || _a === void 0 ? void 0 : _a.isMoreDetail) === null || _b === void 0 ? void 0 : _b.call(_a, row.type)) !== null && _c !== void 0 ? _c : false) ? row : current); });
    }
    getName() {
        return this.codePoints
            .slice()
            .sort((a, b) => Number(a.type) - Number(b.type))
            .map(({ name }) => name)
            .join('.');
    }
    toJSON() {
        const minimalCodePoint = this.getMinimalCodePoint();
        return {
            fileName: this.file.relativePath,
            name: this.getName(),
            codePointType: Number(minimalCodePoint.type),
            startLineNumber: minimalCodePoint.startLineNumber,
            endLineNumber: minimalCodePoint.endLineNumber,
            metricsList: this.metricsValues.map((metrics) => ({
                type: Number(metrics.type),
                typeLabel: metrics.type.label,
                value: Number(metrics),
            })),
        };
    }
}
exports.Metrics = Metrics;
