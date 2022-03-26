"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTGenerator = void 0;
const tslib_1 = require("tslib");
const ts = (0, tslib_1.__importStar)(require("typescript"));
const fs_1 = require("fs");
const ASTNode_1 = require("./ASTNode");
const inversify_1 = require("inversify");
let ASTGenerator = class ASTGenerator {
    generate(file) {
        const node = ts.createSourceFile(file.fullPath, (0, fs_1.readFileSync)(file.fullPath).toString(), ts.ScriptTarget.ES2016, 
        /* setParentNodes */ true);
        return new ASTNode_1.ASTNode(node, node);
    }
};
ASTGenerator = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], ASTGenerator);
exports.ASTGenerator = ASTGenerator;
