"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexityIncrement = void 0;
class ComplexityIncrement {
    constructor(complexityCountableNode, nestDeepCount) {
        this.complexity = complexityCountableNode.isIncrement() ? 1 : 0;
        this.nestDeepCount = complexityCountableNode.isNestingIncrement() ? nestDeepCount : 0;
    }
    valueOf() {
        return this.complexity + this.nestDeepCount;
    }
}
exports.ComplexityIncrement = ComplexityIncrement;
