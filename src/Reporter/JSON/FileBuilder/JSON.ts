import { createWriteStream, existsSync, statSync } from 'fs';
import { inject, injectable, optional } from 'inversify';
import { Readable, Writable } from 'stream';
import { Metrics } from '../../../Analyzer/Metrics/Metrics';
import { Types } from '../../../types/Types';
import { FileBuilder } from '../../FileBuilder';
import { MetricsList } from '../Converter/MetricsList';
import { Summaries } from '../Converter/Summaries';

@injectable()
export class JSON implements FileBuilder {
  private outputStream: Writable;

  constructor(@inject(Types.outputPath) @optional() outputPath?: string) {
    if (outputPath && existsSync(outputPath) && statSync(outputPath).isDirectory()) {
      throw new Error(`The directory path is specified.Please specify the file path.`);
    }

    this.outputStream = outputPath ? createWriteStream(outputPath, 'utf8') : process.stdout;
  }

  async build(metrics: Metrics[]): Promise<void> {
    return new Promise((resolve) => {
      const stream = Readable.from([
        global.JSON.stringify({
          summaries: new Summaries(metrics),
          details: new MetricsList(metrics),
        }),
      ]);

      stream.pipe(this.outputStream);
      stream.on('end', () => {
        resolve();
      });
    });
  }
}
