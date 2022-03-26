"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntryPoint = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const ScriptBuilder_1 = require("../ScriptBuilder");
const Writer_1 = require("../Writer");
let EntryPoint = class EntryPoint {
    constructor(writer, scriptBuilder) {
        this.writer = writer;
        this.scriptBuilder = scriptBuilder;
    }
    async build() {
        const script = await this.scriptBuilder.build(`${__dirname}/../FrontEnd/Bootstrap.ts`);
        return this.writer.write('app.js', script);
    }
};
EntryPoint = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Writer_1.Writer)),
    (0, tslib_1.__param)(1, (0, inversify_1.inject)(ScriptBuilder_1.ScriptBuilder)),
    (0, tslib_1.__metadata)("design:paramtypes", [Writer_1.Writer, ScriptBuilder_1.ScriptBuilder])
], EntryPoint);
exports.EntryPoint = EntryPoint;
