"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PHP = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Analyzer_1 = require("../../Analyzer/Analyzer");
const LanguageAnalyzer_1 = require("../Analyzer/LanguageAnalyzer");
let PHP = class PHP extends LanguageAnalyzer_1.LanguageAnalyzer {
    constructor(analyzer) {
        super(analyzer);
        this.extensions = ['.php'];
    }
};
PHP = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Analyzer_1.Analyzer)),
    (0, tslib_1.__param)(0, (0, inversify_1.named)('PHP')),
    (0, tslib_1.__metadata)("design:paramtypes", [Analyzer_1.Analyzer])
], PHP);
exports.PHP = PHP;
