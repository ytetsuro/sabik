"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexityCountableNode = void 0;
class ComplexityCountableNode {
    constructor({ DSL, children = [] }) {
        this.DSL = DSL;
        this.children = children;
    }
    isIncrement() {
        return this.DSL.includes('I');
    }
    isNestLevelUp() {
        return this.DSL.includes('N');
    }
    isNestingIncrement() {
        return this.DSL.includes('I') && this.DSL.includes('N');
    }
    getChildren() {
        return this.children.map((config) => new ComplexityCountableNode(config));
    }
}
exports.ComplexityCountableNode = ComplexityCountableNode;
