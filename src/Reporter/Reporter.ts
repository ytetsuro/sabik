import { inject, injectable, multiInject, optional } from 'inversify';
import { Types } from '../types/Types';
import { FileBuilder } from './FileBuilder';
import { Metrics } from '../Analyzer/Metrics/Metrics';

@injectable()
export class Reporter {
  constructor(
    @multiInject(Types.outputFileBuilder)
    private readonly builders: FileBuilder[],
    @inject(Types.outputPath) @optional() private readonly outputPath?: string
  ) {}

  async output(metrics: Metrics[]) {
    await Promise.all(<Promise<void>[]>this.builders.map((builder) => builder.build(metrics)));

    if (this.outputPath) {
      console.log(`Generated report. ${this.outputPath}`);
    }
  }
}
