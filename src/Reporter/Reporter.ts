import { inject, injectable, multiInject } from 'inversify';
import { Types } from '../types/Types';
import { FileBuilder } from './FileBuilder';
import { Metrics } from '../Analyzer/Metrics/Metrics';
import { statSync } from 'fs';
import { existsSync } from 'fs';

@injectable()
export class Reporter {
  constructor(
    @multiInject(Types.outputFileBuilder)
    private readonly builders: FileBuilder[],
    @inject(Types.outputPath) private readonly outputPath: string
  ) { 
    const exists = existsSync(outputPath);
    const fileStat = statSync(outputPath);

    if (exists && !fileStat.isDirectory()) {
      throw new Error(`The file path is specified.Please specify the directory path.`);
    }
  }

  async output(metrics: Metrics[]) {
    await Promise.all(
      <Promise<void>[]>this.builders.map((builder) => builder.build(metrics))
    );

    console.log(`Generated report. ${this.outputPath}`);
  }
}
