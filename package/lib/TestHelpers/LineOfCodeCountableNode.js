"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineOfCodeCountableNode = void 0;
class LineOfCodeCountableNode {
    constructor(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }
    getRemovedCommentAndEmptyLineText() {
        return this.text.replace(/\/\*[\s\S]*?\*\/|\/\/.*/gm, '').replace(/^\s*$(?:\r\n?|\n)/gm, '');
    }
}
exports.LineOfCodeCountableNode = LineOfCodeCountableNode;
