"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineOfCode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const LineOfCodeCountableNode_1 = require("../LineOfCodeCountableNode");
let LineOfCode = class LineOfCode {
    convert(astNode) {
        return new LineOfCodeCountableNode_1.LineOfCodeCountableNode(astNode);
    }
};
LineOfCode = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], LineOfCode);
exports.LineOfCode = LineOfCode;
