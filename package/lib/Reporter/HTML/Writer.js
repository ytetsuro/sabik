"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Writer = void 0;
const tslib_1 = require("tslib");
const fs = (0, tslib_1.__importStar)(require("fs"));
const inversify_1 = require("inversify");
const path_1 = require("path");
const Types_1 = require("../../types/Types");
let Writer = class Writer {
    constructor(rootPath) {
        this.rootPath = rootPath;
        if (!rootPath || (fs.existsSync(rootPath) && !fs.statSync(rootPath).isDirectory())) {
            throw new Error(`The file path is specified.Please specify the directory path.`);
        }
    }
    async write(filePath, value) {
        const fullFilePath = `${this.rootPath}/${filePath}`;
        fs.mkdirSync((0, path_1.dirname)(fullFilePath), { recursive: true });
        return fs.writeFileSync(fullFilePath, value);
    }
};
Writer = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Types_1.Types.outputPath)),
    (0, tslib_1.__metadata)("design:paramtypes", [String])
], Writer);
exports.Writer = Writer;
