"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const inversify_1 = require("inversify");
const stream_1 = require("stream");
const Types_1 = require("../../../types/Types");
const MetricsList_1 = require("../Converter/MetricsList");
const Summaries_1 = require("../Converter/Summaries");
let JSON = class JSON {
    constructor(outputPath) {
        if (outputPath && (0, fs_1.existsSync)(outputPath) && (0, fs_1.statSync)(outputPath).isDirectory()) {
            throw new Error(`The directory path is specified.Please specify the file path.`);
        }
        this.outputStream = outputPath ? (0, fs_1.createWriteStream)(outputPath, 'utf8') : process.stdout;
    }
    async build(metrics) {
        return new Promise((resolve) => {
            const stream = stream_1.Readable.from([
                global.JSON.stringify({
                    summaries: new Summaries_1.Summaries(metrics),
                    details: new MetricsList_1.MetricsList(metrics),
                }),
            ]);
            stream.pipe(this.outputStream);
            stream.on('end', () => {
                resolve();
            });
        });
    }
};
JSON = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Types_1.Types.outputPath)),
    (0, tslib_1.__param)(0, (0, inversify_1.optional)()),
    (0, tslib_1.__metadata)("design:paramtypes", [String])
], JSON);
exports.JSON = JSON;
