"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNodeExtractor = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const CodePoint_1 = require("./Metrics/CodePoint");
const CodePointType_1 = require("./Metrics/CodePointType");
let ASTNodeExtractor = class ASTNodeExtractor {
    constructor() {
        this.cache = new Map();
    }
    extractMethods(astNode) {
        var _a;
        const cache = (_a = this.cache.get(astNode)) !== null && _a !== void 0 ? _a : new Map();
        if (cache.has(CodePointType_1.CodePointType.Method)) {
            return cache.get(CodePointType_1.CodePointType.Method);
        }
        const analyzedPointNodes = this.generateMethodAnalyzePointNodes(astNode);
        cache.set(CodePointType_1.CodePointType.Method, analyzedPointNodes);
        this.cache.set(astNode, cache);
        return analyzedPointNodes;
    }
    clear() {
        this.cache.clear();
    }
    generateMethodAnalyzePointNodes(astNode) {
        const classesNodes = this.extractClassNode(astNode);
        const functionNodes = this.extractFunctionAndMethodNode(astNode);
        const fauxNodes = functionNodes.filter((row) => row.isFauxClass());
        const pureFunctionNodes = functionNodes.filter((row) => !row.isFauxClass());
        return [
            ...classesNodes.flatMap((row) => this.findMethodAll(row)),
            ...fauxNodes.flatMap((row) => this.findMethodAll(row)),
            ...pureFunctionNodes.map((row) => this.createAnalyzePointNode(row)),
        ];
    }
    findMethodAll(astNode) {
        return [...astNode.getChildren()]
            .flatMap((row) => this.extractFunctionAndMethodNode(row))
            .map((row) => this.createAnalyzePointNode(row, [this.createCodePoint(astNode)]));
    }
    createCodePoint(astNode) {
        return new CodePoint_1.CodePoint(CodePointType_1.CodePointType.castAs(astNode), astNode.getName(), astNode.getStartLineNumber(), astNode.getEndLineNumber());
    }
    createAnalyzePointNode(astNode, codePoints = []) {
        return {
            codePoints: codePoints.concat(this.createCodePoint(astNode)),
            astNode,
        };
    }
    extractClassNode(astNode) {
        const result = [];
        if (astNode.isFunction() || astNode.isMethod()) {
            return [];
        }
        if (astNode.isClass()) {
            return [astNode];
        }
        return result.concat(...astNode.getChildren().map((row) => this.extractClassNode(row)));
    }
    extractFunctionAndMethodNode(astNode) {
        const result = [];
        if (astNode.isFunction() || astNode.isMethod()) {
            return [astNode];
        }
        if (astNode.isClass()) {
            return [];
        }
        return result.concat(...astNode.getChildren().map((row) => this.extractFunctionAndMethodNode(row)));
    }
};
ASTNodeExtractor = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], ASTNodeExtractor);
exports.ASTNodeExtractor = ASTNodeExtractor;
