"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFinder = void 0;
const tslib_1 = require("tslib");
const fs = (0, tslib_1.__importStar)(require("fs"));
const inversify_1 = require("inversify");
const path_1 = require("path");
const Types_1 = require("../../types/Types");
const File_1 = require("./File");
let FileFinder = class FileFinder {
    constructor(currentPath, findSource, excludes) {
        this.currentPath = currentPath.endsWith('/') ? currentPath.substr(0, currentPath.length - 1) : currentPath;
        this.findSource = findSource;
        this.excludes = excludes;
    }
    find(findPath) {
        let result = [];
        const fullPath = this.getFullPath(findPath);
        if (fs.lstatSync(fullPath).isDirectory()) {
            result = result.concat(...this.findByDirectoryPath(fullPath));
        }
        else if (this.isTarget(fullPath)) {
            result.push(this.createFindResult(fullPath));
        }
        return result;
    }
    findByDirectoryPath(path) {
        return fs.readdirSync(path).map((row) => this.find(`${path}/${row}`));
    }
    createFindResult(path) {
        return new File_1.File(path, path.substr(this.currentPath.length + 1));
    }
    getFullPath(path) {
        return (0, path_1.resolve)(path.startsWith('/') ? path : `${this.currentPath}/${path}`);
    }
    isTarget(path) {
        return fs.lstatSync(path).isFile() && this.findSource.test(path) && !this.isExcludePath(path);
    }
    isExcludePath(path) {
        return !!this.excludes.find((exclude) => exclude.test(path));
    }
};
FileFinder = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Types_1.Types.rootPath)),
    (0, tslib_1.__param)(1, (0, inversify_1.inject)(Types_1.Types.fileMatches)),
    (0, tslib_1.__param)(2, (0, inversify_1.inject)(Types_1.Types.fileExcludes)),
    (0, tslib_1.__metadata)("design:paramtypes", [String, RegExp, Array])
], FileFinder);
exports.FileFinder = FileFinder;
