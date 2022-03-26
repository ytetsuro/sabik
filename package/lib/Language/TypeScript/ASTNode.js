"use strict";
var ASTNode_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNode = void 0;
const tslib_1 = require("tslib");
const ts = (0, tslib_1.__importStar)(require("typescript"));
const ComplexityCountableNode_1 = require("./ComplexityCountableNode");
const inversify_1 = require("inversify");
let ASTNode = ASTNode_1 = class ASTNode {
    constructor(node, sourceFile) {
        this.sourceFile = sourceFile;
        this.node = node;
    }
    isClass() {
        return this.node.kind === ts.SyntaxKind.ClassDeclaration;
    }
    isMethod() {
        return ASTNode_1.methodSyntaxKinds.includes(this.node.kind);
    }
    getName() {
        var _a, _b;
        let result = '';
        if (this.isClass()) {
            result = (_b = (_a = this.node.name) === null || _a === void 0 ? void 0 : _a.getText()) !== null && _b !== void 0 ? _b : 'Anynomus Class';
        }
        else if (this.isMethod()) {
            const methodName = this.node.kind === ts.SyntaxKind.Constructor ? 'constructor' : this.node.name.getText();
            const parameters = this.node.parameters.map((row) => row.name.getText()).join(',');
            result = `${methodName}(${parameters})`;
        }
        else if (this.isFunction()) {
            return this.getFunctionName();
        }
        return result;
    }
    isFunction() {
        return ASTNode_1.functionSyntaxKinds.includes(this.node.kind);
    }
    isFauxClass() {
        if (!this.isPossibleFauxClass()) {
            return false;
        }
        return (new ASTNode_1(this.node.body, this.sourceFile)
            .getChildren()
            .filter((row) => new ComplexityCountableNode_1.ComplexityCountableNode(row).isIncrement() && !row.isFunction()).length === 0);
    }
    getStartLineNumber() {
        return this.sourceFile.getLineAndCharacterOfPosition(this.node.getStart()).line;
    }
    getEndLineNumber() {
        return this.sourceFile.getLineAndCharacterOfPosition(this.node.getEnd()).line;
    }
    isPossibleFauxClass() {
        if (this.node.kind === ts.SyntaxKind.FunctionDeclaration && this.node.name) {
            return true;
        }
        if (this.node.parent.kind === ts.SyntaxKind.VariableDeclaration) {
            return true;
        }
        return false;
    }
    getFunctionName() {
        var _a, _b;
        if (this.node.kind === ts.SyntaxKind.FunctionDeclaration && this.node.name) {
            return (_b = (_a = this.node.name) === null || _a === void 0 ? void 0 : _a.getText()) !== null && _b !== void 0 ? _b : '';
        }
        switch (this.node.parent.kind) {
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
                return this.getVariableName(this.node.parent);
            case ts.SyntaxKind.BinaryExpression:
                return this.getPropertyName(this.node.parent);
            case ts.SyntaxKind.PropertyAssignment:
                return this.getPropertyAssignName(this.node.parent);
        }
        return this.isFunction() ? 'Anonymous Function' : '';
    }
    getVariableName(node) {
        return node.name.getText();
    }
    getPropertyName(node) {
        return node
            .getText()
            .split('=', 2)[0]
            .replace(/[\n|\r|\s|\t]+/, '');
    }
    getPropertyAssignName(node) {
        return `${this.findPropertyAssignName(node).reverse().join('.')}()`;
    }
    findPropertyAssignName(node) {
        const result = [node.name.getText()];
        const parentNode = node.parent.parent;
        switch (parentNode.kind) {
            case ts.SyntaxKind.PropertyAssignment:
                return result.concat(this.findPropertyAssignName(parentNode));
            case ts.SyntaxKind.BinaryExpression:
                return result.concat(this.getPropertyName(parentNode)
                    .split('.')
                    .reverse());
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
                return result.concat(this.getVariableName(parentNode));
        }
        return result;
    }
    getChildren() {
        const result = [];
        ts.forEachChild(this.node, (row) => {
            result.push(row);
        });
        return result.map((row) => new ASTNode_1(row, this.sourceFile));
    }
};
ASTNode.functionSyntaxKinds = [
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.FunctionExpression,
    ts.SyntaxKind.ArrowFunction,
];
ASTNode.methodSyntaxKinds = [
    ts.SyntaxKind.MethodDeclaration,
    ts.SyntaxKind.Constructor,
    ts.SyntaxKind.GetAccessor,
    ts.SyntaxKind.SetAccessor,
];
ASTNode = ASTNode_1 = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, Object])
], ASTNode);
exports.ASTNode = ASTNode;
