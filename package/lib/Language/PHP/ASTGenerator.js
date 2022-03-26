"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTGenerator = void 0;
const tslib_1 = require("tslib");
const php_parser_1 = require("php-parser");
const fs_1 = require("fs");
const ASTNode_1 = require("./ASTNode");
const inversify_1 = require("inversify");
let ASTGenerator = class ASTGenerator {
    constructor() {
        this.engine = new php_parser_1.Engine({
            parser: {
                extractDoc: true,
            },
            ast: {
                withPositions: true,
                withSource: true,
            },
        });
    }
    generate(file) {
        const node = this.engine.parseCode((0, fs_1.readFileSync)(file.fullPath).toString(), file.fullPath);
        return new ASTNode_1.ASTNode(node, node);
    }
};
ASTGenerator = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], ASTGenerator);
exports.ASTGenerator = ASTGenerator;
