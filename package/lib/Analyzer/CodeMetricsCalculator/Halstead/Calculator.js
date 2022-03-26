"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
const tslib_1 = require("tslib");
const OperandAndOperator_1 = require("./OperandAndOperator");
const HalsteadBugsDelivered_1 = require("./MetricsValue/HalsteadBugsDelivered");
const HalsteadDifficulty_1 = require("./MetricsValue/HalsteadDifficulty");
const HalsteadEffort_1 = require("./MetricsValue/HalsteadEffort");
const HalsteadLength_1 = require("./MetricsValue/HalsteadLength");
const HalsteadTime_1 = require("./MetricsValue/HalsteadTime");
const HalsteadVocabulary_1 = require("./MetricsValue/HalsteadVocabulary");
const HalsteadVolume_1 = require("./MetricsValue/HalsteadVolume");
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
        const operands = new Map();
        const operators = new Map();
        this.extractOperandsAndOperators(node).forEach((row) => {
            this.add(row, operands, operators);
        });
        const operandAndOperator = new OperandAndOperator_1.OperandAndOperator(operands, operators);
        const length = new HalsteadLength_1.HalsteadLength(operandAndOperator);
        const vocabulary = new HalsteadVocabulary_1.HalsteadVocabulary(operandAndOperator);
        const difficulty = new HalsteadDifficulty_1.HalsteadDifficulty(operandAndOperator);
        const volume = new HalsteadVolume_1.HalsteadVolume(length, vocabulary);
        const bugsDelivered = new HalsteadBugsDelivered_1.HalsteadBugsDelivered(volume);
        const effort = new HalsteadEffort_1.HalsteadEffort(volume, difficulty);
        const time = new HalsteadTime_1.HalsteadTime(effort);
        return [length, vocabulary, difficulty, volume, bugsDelivered, effort, time];
    }
    extractOperandsAndOperators(node) {
        let result = [];
        if (node.isOperand() || node.isOperator()) {
            result.push(node);
        }
        result = result.concat(...node.getChildren().map((row) => this.extractOperandsAndOperators(row)));
        return result;
    }
    add(node, operands, operators) {
        var _a;
        let map = operands;
        if (node.isOperator()) {
            map = operators;
        }
        map.set(node.getText(), ((_a = map.get(node.getText())) !== null && _a !== void 0 ? _a : 0) + 1);
    }
};
Calculator = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(MethodAnalyzer_1.MethodAnalyzer)),
    (0, tslib_1.__param)(1, (0, inversify_1.inject)(Types_1.Types.halsteadConverter)),
    (0, tslib_1.__metadata)("design:paramtypes", [MethodAnalyzer_1.MethodAnalyzer, Object])
], Calculator);
exports.Calculator = Calculator;
