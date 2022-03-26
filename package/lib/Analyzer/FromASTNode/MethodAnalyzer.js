"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodAnalyzer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const ASTNodeExtractor_1 = require("../ASTNodeExtractor");
let MethodAnalyzer = class MethodAnalyzer {
    constructor(extractor) {
        this.extractor = extractor;
    }
    analyze(rootASTNodeList) {
        return rootASTNodeList.flatMap((rootASTNode) => this.analyzeMethod(rootASTNode));
    }
    analyzeMethod(rootASTNode) {
        const targets = this.extractor.extractMethods(rootASTNode.astNode);
        return targets.map((target) => ({
            file: rootASTNode.file,
            codePoints: target.codePoints,
            astNode: target.astNode,
        }));
    }
};
MethodAnalyzer = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(ASTNodeExtractor_1.ASTNodeExtractor)),
    (0, tslib_1.__metadata)("design:paramtypes", [ASTNodeExtractor_1.ASTNodeExtractor])
], MethodAnalyzer);
exports.MethodAnalyzer = MethodAnalyzer;
