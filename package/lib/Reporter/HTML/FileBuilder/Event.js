"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const tslib_1 = require("tslib");
const pako_1 = (0, tslib_1.__importDefault)(require("pako"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const Writer_1 = require("../Writer");
const inversify_1 = require("inversify");
const Types_1 = require("../../../types/Types");
let Event = class Event {
    constructor(writer, rootPath) {
        this.writer = writer;
        this.rootPath = rootPath;
    }
    async build(metrics) {
        const events = [];
        const fileList = metrics.reduce((fileList, { file }) => fileList.add(file.relativePath), new Set());
        events.push(this.writer.write('event/analyzed.js', this.createCode('analyzed', this.createZIPByAnalyzedJSON(metrics))));
        events.push(...[...fileList.values()].map((filePath) => this.writer.write(`event/sourceCode/${filePath}.js`, this.createCode('sourceCode', this.createZIPBySourceCode(filePath)))));
        return Promise.all(events);
    }
    createCode(type, eventData) {
        return `document.dispatchEvent(
      new CustomEvent('sabik:resourceLoaded:${type}', {
        bubbles: true,
        detail: {
          data: '${eventData}'
        }
      })
    );`;
    }
    createZIPBySourceCode(fileName) {
        const sourceCoode = fs_1.default.readFileSync(`${this.rootPath}/${fileName}`);
        return this.createZIP(sourceCoode.toString());
    }
    createZIPByAnalyzedJSON(metrics) {
        return this.createZIP(JSON.stringify(metrics));
    }
    createZIP(text) {
        const buffer = Buffer.from(pako_1.default.deflate(text, { to: 'string' }), 'binary');
        return buffer.toString('base64');
    }
};
Event = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Writer_1.Writer)),
    (0, tslib_1.__param)(1, (0, inversify_1.inject)(Types_1.Types.rootPath)),
    (0, tslib_1.__metadata)("design:paramtypes", [Writer_1.Writer, String])
], Event);
exports.Event = Event;
