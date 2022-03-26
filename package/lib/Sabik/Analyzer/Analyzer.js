"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analyzer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const LanguageAnalyzer_1 = require("./LanguageAnalyzer");
let Analyzer = class Analyzer {
    constructor(analyzers) {
        this.analyzers = analyzers;
    }
    analyze(files) {
        return this.analyzers.flatMap((analyzer) => analyzer.analyze(files));
    }
};
Analyzer = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.multiInject)(LanguageAnalyzer_1.LanguageAnalyzer)),
    (0, tslib_1.__metadata)("design:paramtypes", [Array])
], Analyzer);
exports.Analyzer = Analyzer;
