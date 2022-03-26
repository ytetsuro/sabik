"use strict";
var ASTNode_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTNode = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const PHPParser = (0, tslib_1.__importStar)(require("php-parser"));
const ASTKind_1 = require("./ASTKind");
let ASTNode = ASTNode_1 = class ASTNode {
    constructor(node, sourceFile, parentNode) {
        this.node = node;
        this.sourceFile = sourceFile;
        this.parentNode = parentNode;
        if (sourceFile.kind !== ASTKind_1.ASTKind.PROGRAM) {
            throw new Error('sourceFile ast node is not program kind.');
        }
    }
    get kind() {
        return this.node.kind;
    }
    get source() {
        var _a, _b, _c;
        const startOffset = this.getStartOffset();
        const endOffset = this.getEndOffset();
        return (_c = (_b = (_a = this.sourceFile.loc) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.substr(startOffset, endOffset - startOffset)) !== null && _c !== void 0 ? _c : '';
    }
    get commentStripSource() {
        var _a, _b;
        const startOffset = this.getStartOffset();
        const endOffset = this.getEndOffset();
        const sourceArray = this.source.split('');
        const commentPositions = (_b = (_a = this.sourceFile.comments) === null || _a === void 0 ? void 0 : _a.map((row) => row.loc).filter(({ start, end }) => start.offset >= startOffset && endOffset >= end.offset).reduce((result, { start, end }, index) => {
            var _a, _b;
            return result.concat({
                offset: start.offset - startOffset,
                size: end.offset - start.offset,
                currentTotalSize: ((_b = (_a = result === null || result === void 0 ? void 0 : result[index - 1]) === null || _a === void 0 ? void 0 : _a.currentTotalSize) !== null && _b !== void 0 ? _b : 0) + end.offset - start.offset,
            });
        }, []).map((row, index, list) => {
            var _a, _b;
            return ({
                ...row,
                offset: row.offset - ((_b = (_a = list === null || list === void 0 ? void 0 : list[index - 1]) === null || _a === void 0 ? void 0 : _a.currentTotalSize) !== null && _b !== void 0 ? _b : 0),
            });
        })) !== null && _b !== void 0 ? _b : [];
        commentPositions.forEach(({ offset, size }) => {
            sourceArray.splice(offset, size);
        });
        return sourceArray.join('');
    }
    isClass() {
        return [ASTKind_1.ASTKind.CLASS, ASTKind_1.ASTKind.TRAIT].includes(this.kind);
    }
    isMethod() {
        return this.node.kind === ASTKind_1.ASTKind.METHOD;
    }
    getName() {
        var _a, _b;
        let result = '';
        if (this.isClass()) {
            result = (_a = this.extractNameString(this.node.name)) !== null && _a !== void 0 ? _a : 'Anonymous Class';
        }
        else if (this.isMethod()) {
            const methodName = (_b = this.extractNameString(this.node.name)) !== null && _b !== void 0 ? _b : 'Anonymous Class';
            const params = this.node.arguments
                .map((row) => this.extractNameString(row))
                .filter((row) => row)
                .map((row) => `$${row}`);
            result = `${methodName}(${params.join(', ')})`;
        }
        else if (this.isFunction()) {
            return this.getFunctionName(this);
        }
        return result;
    }
    getFunctionName(node, args = []) {
        var _a, _b, _c, _d, _e, _f;
        if (node.node.kind === ASTKind_1.ASTKind.FUNCTION) {
            return (_a = this.extractNameString(node.node)) !== null && _a !== void 0 ? _a : 'Anonymous Function';
        }
        const currentNode = (_b = node === null || node === void 0 ? void 0 : node.parentNode) === null || _b === void 0 ? void 0 : _b.node;
        switch (currentNode === null || currentNode === void 0 ? void 0 : currentNode.kind) {
            case ASTKind_1.ASTKind.ARRAY:
                break;
            case ASTKind_1.ASTKind.ENTRY:
                args.push((_d = this.extractNameString((_c = currentNode) === null || _c === void 0 ? void 0 : _c.key)) !== null && _d !== void 0 ? _d : '[]');
                break;
            case ASTKind_1.ASTKind.ASSIGN:
                args.push(`$${(_f = this.extractNameString((_e = currentNode) === null || _e === void 0 ? void 0 : _e.left)) !== null && _f !== void 0 ? _f : ''}`);
                return args.reverse().join('.');
            default:
                return 'Anonymous Function';
        }
        return this.getFunctionName(node.parentNode, args);
    }
    extractNameString(node) {
        var _a, _b, _c, _d, _e;
        const name = (_a = node === null || node === void 0 ? void 0 : node.name) !== null && _a !== void 0 ? _a : node === null || node === void 0 ? void 0 : node.value;
        const result = typeof name === 'string' ? name : (_b = name === null || name === void 0 ? void 0 : name.name) !== null && _b !== void 0 ? _b : null;
        if (result !== null) {
            return result;
        }
        else if ([ASTKind_1.ASTKind.PROPERTY_LOOKUP, ASTKind_1.ASTKind.STATIC_LOOKUP].includes(node === null || node === void 0 ? void 0 : node.kind)) {
            return ((_e = (_d = (_c = node === null || node === void 0 ? void 0 : node.loc) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.split('=', 2)[0].replace(/[\n|\r|\s|\t]+/g, '').replace(/(->|::)/g, '.').replace(/^\$/, '')) !== null && _e !== void 0 ? _e : '');
        }
        return null;
    }
    isFunction() {
        return [ASTKind_1.ASTKind.FUNCTION, ASTKind_1.ASTKind.ARROW_FUNCTION, ASTKind_1.ASTKind.CLOSURE].includes(this.node.kind);
    }
    isFauxClass() {
        return false;
    }
    getStartLineNumber() {
        var _a;
        return ((_a = this.node.loc) === null || _a === void 0 ? void 0 : _a.start.line) - 1;
    }
    getEndLineNumber() {
        var _a;
        return ((_a = this.node.loc) === null || _a === void 0 ? void 0 : _a.end.line) - 1;
    }
    getStartOffset() {
        var _a, _b, _c, _d, _e;
        return (_e = (_d = (_c = (_b = (_a = this.node) === null || _a === void 0 ? void 0 : _a.leadingComments) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.loc) === null || _d === void 0 ? void 0 : _d.start.offset) !== null && _e !== void 0 ? _e : this.node.loc.start.offset;
    }
    getEndOffset() {
        return this.node.loc.end.offset;
    }
    getChildren() {
        return [...Object.values(this.node)]
            .filter((row) => !!row)
            .flatMap((row) => row)
            .filter((row) => typeof row === 'object')
            .filter((row) => typeof row.kind === 'string')
            .map((row) => new ASTNode_1(row, this.sourceFile, this));
    }
};
ASTNode = ASTNode_1 = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, PHPParser.Program, ASTNode])
], ASTNode);
exports.ASTNode = ASTNode;
