"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSS = void 0;
const tslib_1 = require("tslib");
const postcss_1 = (0, tslib_1.__importDefault)(require("postcss"));
const postcss_import_1 = (0, tslib_1.__importDefault)(require("postcss-import"));
const autoprefixer_1 = (0, tslib_1.__importDefault)(require("autoprefixer"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const Writer_1 = require("../Writer");
const inversify_1 = require("inversify");
let CSS = class CSS {
    constructor(writer) {
        this.writer = writer;
    }
    async build() {
        const filePath = `${__dirname}/../FrontEnd/app.css`;
        const sourceCoode = fs_1.default.readFileSync(filePath);
        const css = new Promise((resolve) => {
            (0, postcss_1.default)([autoprefixer_1.default])
                .use((0, postcss_import_1.default)())
                .process(sourceCoode, { from: filePath })
                .then((result) => {
                resolve(result.css);
            });
        });
        return this.writer.write('app.css', await css);
    }
};
CSS = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Writer_1.Writer)),
    (0, tslib_1.__metadata)("design:paramtypes", [Writer_1.Writer])
], CSS);
exports.CSS = CSS;
