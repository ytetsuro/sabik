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
    outputReportDir: flags.string({
      char: 'o',
      description: 'output report directory path. default: ./sabik_report',
    }),
    excludes: flags.string({
      description:
        'exclude patterns is separated by a comma. example: .test.ts$,.spec.ts$',
    }),
    matches: flags.string({ description: 'match patterns. example: .ts$' }),
  };

  static args = [{ name: 'target' }];

  async run() {
    const { args, flags } = this.parse(Sabik);

    const outputPath = resolve(
      flags?.outputReportDir ?? `${process.cwd()}/sabik_report`
    );
    const analyzedTarget = resolve(args.target ?? process.cwd());
    const excludes = (<string>(flags.excludes ?? '$^'))
      .split(',')
      .map((row) => new RegExp(row));
    const matches = new RegExp(flags.matches ?? '.*');

    if (!fs.existsSync(analyzedTarget)) {
      return this.error(`${analyzedTarget}: No such file or directory.`);
    } else if (
      fs.existsSync(outputPath) &&
      !fs.statSync(outputPath).isDirectory()
    ) {
      return this.error(`${outputPath} is not directory.`);
    }

    const rootPath = fs.statSync(analyzedTarget).isDirectory()
      ? analyzedTarget
      : dirname(analyzedTarget);

    container.bind<string>(Types.rootPath).toConstantValue(rootPath);
    container.bind<string>(Types.outputPath).toConstantValue(outputPath);
    container.bind<RegExp>(Types.fileMatches).toConstantValue(matches);
    container.bind<RegExp[]>(Types.fileExcludes).toConstantValue(excludes);

    const main = container.get(Main);

    main.exec(analyzedTarget);
  }
}

export = Sabik;
