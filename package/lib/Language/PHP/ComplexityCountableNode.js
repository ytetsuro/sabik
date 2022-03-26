"use strict";
var ComplexityCountableNode_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexityCountableNode = void 0;
const tslib_1 = require("tslib");
const ASTNode_1 = require("./ASTNode");
const ASTKind_1 = require("./ASTKind");
const inversify_1 = require("inversify");
let ComplexityCountableNode = ComplexityCountableNode_1 = class ComplexityCountableNode {
    constructor(node) {
        this.node = node;
    }
    isNestLevelUp() {
        return !this.isElse() && ComplexityCountableNode_1.nestLevelUpKinds.includes(this.node.kind);
    }
    isIncrement() {
        if (this.isElse()) {
            return true;
        }
        else if (ComplexityCountableNode_1.nestingIncrementSyntaxKinds.includes(this.node.kind)) {
            return true;
        }
        else if (this.node.kind === ASTKind_1.ASTKind.LABEL) {
            return true;
        }
        else if (this.node.kind === ASTKind_1.ASTKind.BIN &&
            ['and', 'or', '&&', '||', 'xor'].includes(this.node.node.type)) {
            return true;
        }
        return false;
    }
    isNestingIncrement() {
        if (this.isElse()) {
            return false;
        }
        return ComplexityCountableNode_1.nestingIncrementSyntaxKinds.includes(this.node.kind);
    }
    isElse() {
        const parent = this.node.parentNode;
        return (parent === null || parent === void 0 ? void 0 : parent.kind) === ASTKind_1.ASTKind.IF && parent.node.alternate === this.node.node;
    }
    getChildren() {
        return this.node.getChildren().map((node) => new ComplexityCountableNode_1(node));
    }
};
ComplexityCountableNode.nestLevelUpKinds = [
    ASTKind_1.ASTKind.IF,
    ASTKind_1.ASTKind.CATCH,
    ASTKind_1.ASTKind.SWITCH,
    ASTKind_1.ASTKind.FOR,
    ASTKind_1.ASTKind.WHILE,
    ASTKind_1.ASTKind.DO,
    ASTKind_1.ASTKind.RETURN_IF,
    ASTKind_1.ASTKind.FUNCTION,
    ASTKind_1.ASTKind.CLOSURE,
    ASTKind_1.ASTKind.ARROW_FUNCTION,
];
ComplexityCountableNode.nestingIncrementSyntaxKinds = [
    ASTKind_1.ASTKind.IF,
    ASTKind_1.ASTKind.CATCH,
    ASTKind_1.ASTKind.SWITCH,
    ASTKind_1.ASTKind.FOR,
    ASTKind_1.ASTKind.WHILE,
    ASTKind_1.ASTKind.RETURN_IF,
];
ComplexityCountableNode = ComplexityCountableNode_1 = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [ASTNode_1.ASTNode])
], ComplexityCountableNode);
exports.ComplexityCountableNode = ComplexityCountableNode;
