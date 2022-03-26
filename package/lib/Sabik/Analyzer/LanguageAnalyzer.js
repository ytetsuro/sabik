"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageAnalyzer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Analyzer_1 = require("../../Analyzer/Analyzer");
let LanguageAnalyzer = class LanguageAnalyzer {
    constructor(analyzer) {
        this.analyzer = analyzer;
    }
    analyze(files) {
        const analyzableFiles = files.filter((file) => this.extensions.includes(file.extension));
        return this.analyzer.analyze(analyzableFiles);
    }
};
LanguageAnalyzer = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Analyzer_1.Analyzer])
], LanguageAnalyzer);
exports.LanguageAnalyzer = LanguageAnalyzer;
