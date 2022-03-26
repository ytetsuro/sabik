"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporter = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Types_1 = require("../types/Types");
let Reporter = class Reporter {
    constructor(builders, outputPath) {
        this.builders = builders;
        this.outputPath = outputPath;
    }
    async output(metrics) {
        await Promise.all(this.builders.map((builder) => builder.build(metrics)));
        if (this.outputPath) {
            console.log(`Generated report. ${this.outputPath}`);
        }
    }
};
Reporter = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.multiInject)(Types_1.Types.outputFileBuilder)),
    (0, tslib_1.__param)(1, (0, inversify_1.inject)(Types_1.Types.outputPath)),
    (0, tslib_1.__param)(1, (0, inversify_1.optional)()),
    (0, tslib_1.__metadata)("design:paramtypes", [Array, String])
], Reporter);
exports.Reporter = Reporter;
