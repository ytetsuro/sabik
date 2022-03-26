"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineOfCodeCountableNode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const ts = (0, tslib_1.__importStar)(require("typescript"));
const ASTNode_1 = require("./ASTNode");
let LineOfCodeCountableNode = class LineOfCodeCountableNode {
    constructor(node) {
        this.pureNode = node.node;
    }
    getText() {
        return this.pureNode.getFullText();
    }
    getRemovedCommentAndEmptyLineText() {
        const sourceFile = ts.createSourceFile('dummy.ts', this.pureNode.getFullText(), ts.ScriptTarget.ES2016, 
        /* setParentNodes */ true);
        return ts.createPrinter({ removeComments: true }).printFile(sourceFile);
    }
};
LineOfCodeCountableNode = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [ASTNode_1.ASTNode])
], LineOfCodeCountableNode);
exports.LineOfCodeCountableNode = LineOfCodeCountableNode;
