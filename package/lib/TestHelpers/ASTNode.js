"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNode = void 0;
class ASTNode {
    constructor(DSL, children = {}) {
        this.startLine = 0;
        this.endLine = 0;
        const [structureType, name, startLine, endLine] = DSL.split(':', 4);
        this.structureType = structureType;
        this.name = name;
        this.startLine = Number(startLine);
        this.endLine = Number(endLine);
        this.children = children;
    }
    isClass() {
        return this.structureType === 'C';
    }
    isFauxClass() {
        return this.structureType === 'D';
    }
    isMethod() {
        return this.structureType === 'M';
    }
    isFunction() {
        return this.structureType === 'F' || this.isMethod() || this.isFauxClass();
    }
    getName() {
        return this.name;
    }
    getStartLineNumber() {
        return this.startLine;
    }
    getEndLineNumber() {
        return this.endLine;
    }
    getChildren() {
        return Object.keys(this.children).map((keyName) => new ASTNode(keyName, this.children[keyName]));
    }
}
exports.ASTNode = ASTNode;
