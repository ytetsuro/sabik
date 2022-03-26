"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Halstead = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const HalsteadCountableNode_1 = require("../HalsteadCountableNode");
let Halstead = class Halstead {
    convert(astNode) {
        return new HalsteadCountableNode_1.HalsteadCountableNode(astNode);
    }
};
Halstead = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], Halstead);
exports.Halstead = Halstead;
