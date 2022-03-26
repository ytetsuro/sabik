"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const tslib_1 = require("tslib");
const LogicalLineOfCode_1 = require("./MetricsValue/LogicalLineOfCode");
const PhysicalLineOfCode_1 = require("./MetricsValue/PhysicalLineOfCode");
const Metrics_1 = require("../../Metrics/Metrics");
const inversify_1 = require("inversify");
const Types_1 = require("../../../types/Types");
let Calculator = class Calculator {
    constructor(analyzers, converter) {
        this.analyzers = analyzers;
        this.converter = converter;
    }
    analyze(astNodes) {
        return this.analyzers
            .flatMap((analyzer) => analyzer.analyze(astNodes))
            .map((row) => ({
            ...row,
            countableNode: this.converter.convert(row.astNode),
        }))
            .map((row) => new Metrics_1.Metrics(row.file, row.codePoints, this.calculate(row.countableNode)));
    }
    calculate(node) {
        const sourceText = node.getText();
        const removedUnnecessaryCodeSourceText = node.getRemovedCommentAndEmptyLineText();
        return [
            new LogicalLineOfCode_1.LogicalLineOfCode(this.getAllLine(removedUnnecessaryCodeSourceText)),
            new PhysicalLineOfCode_1.PhysicalLineOfCode(this.getAllLine(sourceText)),
        ];
    }
    getAllLine(text) {
        return text.replace(/\r\n?$/g, '\n').split('\n').length;
    }
};
Calculator = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.multiInject)(Types_1.Types.analyzer)),
    (0, tslib_1.__param)(1, (0, inversify_1.inject)(Types_1.Types.lineOfCodeConverter)),
    (0, tslib_1.__metadata)("design:paramtypes", [Array, Object])
], Calculator);
exports.Calculator = Calculator;
