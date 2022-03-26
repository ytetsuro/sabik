"use strict";
var HalsteadCountableNode_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadCountableNode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const ts = (0, tslib_1.__importStar)(require("typescript"));
const ASTNode_1 = require("./ASTNode");
let HalsteadCountableNode = HalsteadCountableNode_1 = class HalsteadCountableNode {
    constructor(node) {
        this.node = node;
        this.pureNode = node.node;
    }
    isOperand() {
        return this.isIdentifier() || this.isLiteral();
    }
    isOperator() {
        return this.isKeyword() || this.isToken();
    }
    isIdentifier() {
        return this.pureNode.kind === ts.SyntaxKind.Identifier;
    }
    isLiteral() {
        return this.isBetweenKind(ts.SyntaxKind.FirstLiteralToken, ts.SyntaxKind.LastLiteralToken);
    }
    isToken() {
        return this.isBetweenKind(ts.SyntaxKind.FirstPunctuation, ts.SyntaxKind.LastPunctuation);
    }
    isKeyword() {
        return this.isBetweenKind(ts.SyntaxKind.FirstKeyword, ts.SyntaxKind.LastKeyword);
    }
    isBetweenKind(before, after) {
        const kind = this.pureNode.kind;
        return before <= kind && kind <= after;
    }
    getText() {
        if (this.isOperand()) {
            return String(this.pureNode.text || this.pureNode.kind);
        }
        if (this.isOperator()) {
            return String(this.pureNode.getText());
        }
        return '';
    }
    getChildren() {
        return this.node.getChildren().map((row) => new HalsteadCountableNode_1(row));
    }
};
HalsteadCountableNode = HalsteadCountableNode_1 = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [ASTNode_1.ASTNode])
], HalsteadCountableNode);
exports.HalsteadCountableNode = HalsteadCountableNode;
