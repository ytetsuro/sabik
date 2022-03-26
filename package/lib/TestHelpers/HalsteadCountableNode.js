"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalsteadCountableNode = void 0;
class HalsteadCountableNode {
    constructor({ DSL, text, children = [] }) {
        this.DSL = DSL;
        this.text = text;
        this.children = children;
    }
    isOperator() {
        return this.DSL.includes('T');
    }
    isOperand() {
        return this.DSL.includes('N');
    }
    getText() {
        return this.text;
    }
    getChildren() {
        return this.children.map((config) => new HalsteadCountableNode(config));
    }
}
exports.HalsteadCountableNode = HalsteadCountableNode;
