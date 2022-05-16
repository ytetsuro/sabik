import 'reflect-metadata';
import 'core-js/features/array';
import { dirname, resolve } from 'path';
import * as fs from 'fs';
import { Sabik as Main } from './Sabik/Sabik';
import { container } from './Sabik/DIContainer';
import { Types } from './types/Types';
import { Command, Option } from 'commander';

const generateCommand = () => {
  const program = new Command();
  program
    .addOption(
      new Option('-t, --outputFormat <format>', 'output report format. default: HTML')
        .choices(['HTML', 'JSON', 'CSV'])
        .default('HTML')
    )
  .requiredOption(
    '--excludes <patterns...>',
    'exclude patterns is separated by a comma. example: .test.ts$,.spec.ts$',
    '$^'
  )
    .requiredOption('--matches <pattern>', 'match patterns. example: .ts$', '.*')
    .option(
      '-o, --outputReportPath <path>',
      `output report path.
Fo  r HTML or CSV, specify the directory, and for JSON, specify the file.`
    )
    .arguments('[targetPath]')
    .description('This is source code metrics tool.')
    .action(async (targetPath?: string, options?) => {
      const outputReportPath = options.outputReportPath ?? (options.outputFormat === 'JSON' ? null : './sabik_report');
      const outputPath = outputReportPath !== null ? resolve(outputReportPath) : null;
      const analyzedTarget = resolve(targetPath ?? './');
    const excludes = (<string>options.excludes).split(',').map((row) => new RegExp(row));
      const matches = new RegExp(options.matches);

      if (!fs.existsSync(analyzedTarget)) {
        throw new Error(`${analyzedTarget}: No such file or directory.`);
      }

      const rootPath = fs.statSync(analyzedTarget).isDirectory() ? analyzedTarget : dirname(analyzedTarget);
      container.rebind<string>(Types.rootPath).toConstantValue(rootPath);
      container.rebind<string | null>(Types.outputPath).toConstantValue(outputPath);
      container.rebind<RegExp>(Types.fileMatches).toConstantValue(matches);
      container.rebind<RegExp[]>(Types.fileExcludes).toConstantValue(excludes);

      const main = container.getNamed(Main, options.outputFormat);

      await main.exec(analyzedTarget);
    });

  return program;
};

export = {
  run: (version: string, argv: string[]) =>
    generateCommand().version(version, '-v, --version', 'show CLI version.').parseAsync(argv),
};
