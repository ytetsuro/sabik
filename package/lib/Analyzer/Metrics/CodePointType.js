"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodePointType = void 0;
class CodePointType {
    constructor(scaler) {
        this.scaler = scaler;
    }
    isMoreDetail(codePoint) {
        return this.scaler < codePoint.scaler;
    }
    static castAs(astNode) {
        if (astNode.isClass()) {
            return CodePointType.Class;
        }
        else if (astNode.isFauxClass()) {
            return CodePointType.FauxClass;
        }
        else if (astNode.isMethod() || astNode.isFunction()) {
            return CodePointType.Method;
        }
        throw new Error('It is an ASTNode that cannot be cast.');
    }
    valueOf() {
        return this.scaler;
    }
}
exports.CodePointType = CodePointType;
CodePointType.File = new CodePointType(0);
CodePointType.Class = new CodePointType(1);
CodePointType.FauxClass = new CodePointType(2);
CodePointType.Method = new CodePointType(3);
