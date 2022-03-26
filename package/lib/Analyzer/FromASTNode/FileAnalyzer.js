"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileAnalyzer = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const CodePoint_1 = require("../Metrics/CodePoint");
const CodePointType_1 = require("../Metrics/CodePointType");
let FileAnalyzer = class FileAnalyzer {
    analyze(rootASTNodeList) {
        return rootASTNodeList.map((rootASTNode) => this.analyzeFile(rootASTNode));
    }
    analyzeFile(rootASTNode) {
        return {
            file: rootASTNode.file,
            codePoints: [
                new CodePoint_1.CodePoint(CodePointType_1.CodePointType.File, rootASTNode.file.fullPath, rootASTNode.astNode.getStartLineNumber(), rootASTNode.astNode.getEndLineNumber()),
            ],
            astNode: rootASTNode.astNode,
        };
    }
};
FileAnalyzer = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], FileAnalyzer);
exports.FileAnalyzer = FileAnalyzer;
