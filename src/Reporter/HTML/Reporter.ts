import { Analyzed } from '../../Sabik/Analyzer/Analyzed';
import { inject, injectable, multiInject } from 'inversify';
import { Types } from '../../types/Types';
import { FileBuilder } from './FileBuilder/FileBuilder';

@injectable()
export class Reporter {
  constructor(
    @multiInject(Types.outputFileBuilder)
    private readonly builders: FileBuilder[],
    @inject(Types.outputPath) private readonly outputPath: string
  ) {}

  async output(metrics: Analyzed[]) {
    await Promise.all(
      <Promise<void>[]>this.builders.map((builder) => builder.build(metrics))
    );

    console.log(`Generated report. ${this.outputPath}`);
  }
}
