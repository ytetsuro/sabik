"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodePoint = void 0;
class CodePoint {
    constructor(type, name, startLineNumber, endLineNumber) {
        this.type = type;
        this.name = name;
        this.startLineNumber = startLineNumber;
        this.endLineNumber = endLineNumber;
    }
}
exports.CodePoint = CodePoint;
