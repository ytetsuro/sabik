"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptBuilder = void 0;
const tslib_1 = require("tslib");
const esbuild_1 = require("esbuild");
const inversify_1 = require("inversify");
const util_1 = require("util");
let ScriptBuilder = class ScriptBuilder {
    constructor() {
        this.esbuildOptions = {
            outfile: 'analyze.js',
            bundle: true,
            write: false,
            minify: true,
            platform: 'browser',
            loader: { '.ts': 'ts' },
        };
    }
    async build(entryPoint) {
        const buildConfig = {
            ...this.esbuildOptions,
            entryPoints: [entryPoint],
        };
        const { outputFiles } = await (0, esbuild_1.build)(buildConfig);
        return new util_1.TextDecoder('utf-8').decode(outputFiles === null || outputFiles === void 0 ? void 0 : outputFiles[0].contents);
    }
};
ScriptBuilder = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)()
], ScriptBuilder);
exports.ScriptBuilder = ScriptBuilder;
