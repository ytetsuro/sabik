"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sabik = void 0;
const tslib_1 = require("tslib");
const FileFinder_1 = require("./FileFinder/FileFinder");
const inversify_1 = require("inversify");
const Types_1 = require("../types/Types");
const Analyzer_1 = require("./Analyzer/Analyzer");
let Sabik = class Sabik {
    constructor(analyzer, fileFinder, presenter) {
        this.analyzer = analyzer;
        this.fileFinder = fileFinder;
        this.presenter = presenter;
    }
    exec(findPath) {
        const files = this.fileFinder.find(findPath);
        const fileMetricsList = this.analyzer.analyze(files);
        this.presenter.output(fileMetricsList);
    }
};
Sabik = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(2, (0, inversify_1.inject)(Types_1.Types.reporter)),
    (0, tslib_1.__metadata)("design:paramtypes", [Analyzer_1.Analyzer,
        FileFinder_1.FileFinder, Object])
], Sabik);
exports.Sabik = Sabik;
