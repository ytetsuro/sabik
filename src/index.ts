import 'reflect-metadata';
import 'core-js/features/array';
import { dirname, resolve } from 'path';
import * as fs from 'fs';
import { Command, flags } from '@oclif/command';
import { Sabik as Main } from './Sabik/Sabik';
import { container } from './Sabik/DIContainer';
import { Types } from './types/Types';

class Sabik extends Command {
  static description = 'This is source code metrics tool.';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    outputFormat: flags.enum({
      char: 't',
      options: ['HTML', 'JSON'],
      description: 'output report format. HTML or JSON. default: HTML',
      default: 'HTML'
    }),
    outputReportPath: flags.string({
      char: 'o',
      description: `output report path.
      For HTML, specify the directory, and for JSON, specify the file.`,
      default: ({flags: {outputFormat}}: any) => (outputFormat === 'HTML' ? `./sabik_report` : '' ),
    }),
    excludes: flags.string({
      description:
        'exclude patterns is separated by a comma. example: .test.ts$,.spec.ts$',
      default: '$^',
    }),
    matches: flags.string({
      description: 'match patterns. example: .ts$',
      default: '.*'
    }),
  };

  static args = [{ name: 'target' }];

  async run() {
    const { args, flags } = this.parse(Sabik);

    const outputPath = flags.outputReportPath !== '' ? resolve(flags.outputReportPath) : null;
    const analyzedTarget = resolve(args.target);
    const excludes = (<string>(flags.excludes))
      .split(',')
      .map((row) => new RegExp(row));
    const matches = new RegExp(flags.matches);

    if (!fs.existsSync(analyzedTarget)) {
      return this.error(`${analyzedTarget}: No such file or directory.`);
    }

    const rootPath = fs.statSync(analyzedTarget).isDirectory()
      ? analyzedTarget
      : dirname(analyzedTarget);

    container.bind<string>(Types.rootPath).toConstantValue(rootPath);
    container.bind<string|null>(Types.outputPath).toConstantValue(outputPath);
    container.bind<RegExp>(Types.fileMatches).toConstantValue(matches);
    container.bind<RegExp[]>(Types.fileExcludes).toConstantValue(excludes);

    const main = container.getNamed(Main, flags.outputFormat);

    main.exec(analyzedTarget);
  }
}

export = Sabik;
