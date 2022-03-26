"use strict";
const tslib_1 = require("tslib");
require("reflect-metadata");
require("core-js/features/array");
const path_1 = require("path");
const fs = (0, tslib_1.__importStar)(require("fs"));
const Sabik_1 = require("./Sabik/Sabik");
const DIContainer_1 = require("./Sabik/DIContainer");
const Types_1 = require("./types/Types");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .addOption(new commander_1.Option('-t, --outputFormat <format>', 'output report format. HTML or JSON. default: HTML').choices(['HTML', 'JSON']).default('HTML'))
    .requiredOption('--excludes <patterns...>', 'exclude patterns is separated by a comma. example: .test.ts$,.spec.ts$', '$^')
    .requiredOption('--matches <pattern>', 'match patterns. example: .ts$', '.*')
    .option('-o, --outputReportPath <path>', `output report path.
For HTML, specify the directory, and for JSON, specify the file.`)
    .arguments('[targetPath]')
    .description('This is source code metrics tool.')
    .action(async (targetPath, options) => {
    var _a;
    const outputReportPath = ((_a = options.outputReportPath) !== null && _a !== void 0 ? _a : (options.outputFormat === 'HTML')) ? './sabik_report' : null;
    const outputPath = outputReportPath !== null ? (0, path_1.resolve)(outputReportPath) : null;
    const analyzedTarget = (0, path_1.resolve)(targetPath !== null && targetPath !== void 0 ? targetPath : './');
    const excludes = options.excludes.split(',').map((row) => new RegExp(row));
    const matches = new RegExp(options.matches);
    if (!fs.existsSync(analyzedTarget)) {
        throw new Error(`${analyzedTarget}: No such file or directory.`);
    }
    const rootPath = fs.statSync(analyzedTarget).isDirectory() ? analyzedTarget : (0, path_1.dirname)(analyzedTarget);
    DIContainer_1.container.bind(Types_1.Types.rootPath).toConstantValue(rootPath);
    DIContainer_1.container.bind(Types_1.Types.outputPath).toConstantValue(outputPath);
    DIContainer_1.container.bind(Types_1.Types.fileMatches).toConstantValue(matches);
    DIContainer_1.container.bind(Types_1.Types.fileExcludes).toConstantValue(excludes);
    const main = DIContainer_1.container.getNamed(Sabik_1.Sabik, options.outputFormat);
    main.exec(analyzedTarget);
});
module.exports = {
    run: (version, argv) => program
        .version(version, '-v, --version', 'show CLI version.')
        .parseAsync(argv),
};
