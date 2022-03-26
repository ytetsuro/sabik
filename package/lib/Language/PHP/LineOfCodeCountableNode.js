"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineOfCodeCountableNode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const php_parser_1 = require("php-parser");
const ASTNode_1 = require("./ASTNode");
let LineOfCodeCountableNode = class LineOfCodeCountableNode {
    constructor(node) {
        this.node = node;
    }
    getText() {
        return this.node.source;
    }
    getRemovedCommentAndEmptyLineText() {
        const engine = new php_parser_1.Engine({
            parser: {
                extractDoc: true,
            },
            lexer: {
                all_tokens: true,
            },
        });
        const source = this.node.commentStripSource.replace(/\r\n?/g, '\n');
        // https://github.com/glayzzle/php-parser/pull/737
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokens = engine.tokenGetAll(`<?php ${source}`);
        const removeTargetLineNumbers = tokens
            .filter((row) => row[0] === 'T_WHITESPACE')
            .flatMap((row) => {
            var _a;
            return [...Array(((_a = String(row[1]).match(/\n/g)) !== null && _a !== void 0 ? _a : []).length).keys()]
                .map((index) => index + (Number(row[2]) - 1))
                .slice(1);
        });
        return removeTargetLineNumbers
            .reduce((sourcePerNewLine, removeIndexNumber) => {
            sourcePerNewLine[removeIndexNumber] = null;
            return sourcePerNewLine;
        }, source.split('\n'))
            .filter((row) => row !== null)
            .join('\n');
    }
};
LineOfCodeCountableNode = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [ASTNode_1.ASTNode])
], LineOfCodeCountableNode);
exports.LineOfCodeCountableNode = LineOfCodeCountableNode;
