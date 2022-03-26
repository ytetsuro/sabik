"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Complexity = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const ComplexityCountableNode_1 = require("../ComplexityCountableNode");
let Complexity = class Complexity {
    convert(astNode) {
        return new ComplexityCountableNode_1.ComplexityCountableNode(astNode);
    }
};
Complexity = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], Complexity);
exports.Complexity = Complexity;
