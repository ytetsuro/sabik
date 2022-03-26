"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const tslib_1 = require("tslib");
const ComplexityIncrement_1 = require("./ComplexityIncrement");
const CognitiveComplexity_1 = require("./CognitiveComplexity");
const MethodAnalyzer_1 = require("../../FromASTNode/MethodAnalyzer");
const Metrics_1 = require("../../Metrics/Metrics");
const inversify_1 = require("inversify");
const Types_1 = require("../../../types/Types");
let Calculator = class Calculator {
    constructor(analyzer, converter) {
        this.analyzer = analyzer;
        this.converter = converter;
    }
    analyze(astNodes) {
        return this.analyzer
            .analyze(astNodes)
            .map(({ astNode, ...other }) => ({
            ...other,
            countableNode: this.converter.convert(astNode),
        }))
            .map((row) => new Metrics_1.Metrics(row.file, row.codePoints, this.calculate(row.countableNode)));
    }
    calculate(node) {
        const complexities = this.extractComplexity(node, 0);
        return [new CognitiveComplexity_1.CognitiveComplexity(complexities)];
    }
    extractComplexity(node, nest) {
        const result = [];
        if (node.isIncrement()) {
            result.push(new ComplexityIncrement_1.ComplexityIncrement(node, nest));
        }
        if (node.isNestLevelUp()) {
            const incrementedNest = nest + 1;
            return result.concat(...node
                .getChildren()
                .map((row) => this.extractComplexity(row, incrementedNest))
                .filter((row) => row.length > 0));
        }
        return result.concat(...node.getChildren().map((row) => this.extractComplexity(row, nest)));
    }
};
Calculator = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(MethodAnalyzer_1.MethodAnalyzer)),
    (0, tslib_1.__param)(1, (0, inversify_1.inject)(Types_1.Types.cognitiveComplexityConverter)),
    (0, tslib_1.__metadata)("design:paramtypes", [MethodAnalyzer_1.MethodAnalyzer, Object])
], Calculator);
exports.Calculator = Calculator;
