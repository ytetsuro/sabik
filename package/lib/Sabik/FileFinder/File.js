"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const path_1 = require("path");
class File {
    constructor(fullPath, relativePath) {
        this.fullPath = fullPath;
        this.relativePath = relativePath;
    }
    get extension() {
        return (0, path_1.extname)(this.fullPath);
    }
}
exports.File = File;
