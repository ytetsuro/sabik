"use strict";
var ComplexityCountableNode_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexityCountableNode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const ts = (0, tslib_1.__importStar)(require("typescript"));
const ASTNode_1 = require("./ASTNode");
let ComplexityCountableNode = ComplexityCountableNode_1 = class ComplexityCountableNode {
    constructor(node) {
        this.node = node;
        this.pureNode = node.node;
    }
    isNestLevelUp() {
        return !this.isElse() && ComplexityCountableNode_1.nestLevelUpKinds.includes(this.pureNode.kind);
    }
    isIncrement() {
        if (this.isElse()) {
            return true;
        }
        const allIncrementSyntaxKinds = ComplexityCountableNode_1.incrementSyntaxKinds.concat(...ComplexityCountableNode_1.nestingIncrementSyntaxKinds);
        return allIncrementSyntaxKinds.includes(this.pureNode.kind);
    }
    isNestingIncrement() {
        if (this.isElse()) {
            return false;
        }
        return ComplexityCountableNode_1.nestingIncrementSyntaxKinds.includes(this.pureNode.kind);
    }
    isElse() {
        const parent = this.pureNode.parent;
        return parent.kind === ts.SyntaxKind.IfStatement && parent.elseStatement === this.pureNode;
    }
    getChildren() {
        return this.node.getChildren().map((node) => new ComplexityCountableNode_1(node));
    }
};
ComplexityCountableNode.nestLevelUpKinds = [
    ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.SwitchStatement,
    ts.SyntaxKind.CatchClause,
    ts.SyntaxKind.ForInStatement,
    ts.SyntaxKind.ForOfStatement,
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.WhileStatement,
    ts.SyntaxKind.DoStatement,
    ts.SyntaxKind.ArrowFunction,
    ts.SyntaxKind.FunctionExpression,
    ts.SyntaxKind.ConditionalExpression,
];
ComplexityCountableNode.nestingIncrementSyntaxKinds = [
    ts.SyntaxKind.IfStatement,
    ts.SyntaxKind.SwitchStatement,
    ts.SyntaxKind.ForInStatement,
    ts.SyntaxKind.ForOfStatement,
    ts.SyntaxKind.ForStatement,
    ts.SyntaxKind.WhileStatement,
    ts.SyntaxKind.CatchClause,
    ts.SyntaxKind.ConditionalExpression,
];
ComplexityCountableNode.incrementSyntaxKinds = [
    ts.SyntaxKind.AmpersandAmpersandToken,
    ts.SyntaxKind.BarBarToken,
    ts.SyntaxKind.LabeledStatement,
];
ComplexityCountableNode = ComplexityCountableNode_1 = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [ASTNode_1.ASTNode])
], ComplexityCountableNode);
exports.ComplexityCountableNode = ComplexityCountableNode;
