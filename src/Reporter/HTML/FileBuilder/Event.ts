import pako from 'pako';
import fs from 'fs';
import { Writer } from '../Writer';
import { Analyzed } from '../../../Sabik/Analyzer/Analyzed';
import { inject, injectable } from 'inversify';
import { Types } from '../../../types/Types';

@injectable()
export class Event {
  constructor(
    @inject(Writer) private writer: Writer,
    @inject(Types.rootPath) private rootPath: string
  ) {}

  async build(metrics: Analyzed[]) {
    const events = [];
    events.push(
      this.writer.write(
        'event/analyzed.js',
        this.createCode('analyzed', this.createZIPByAnalyzedJSON(metrics))
      )
    );
    events.push(
      ...metrics.map(({ fileName }) =>
        this.writer.write(
          `event/sourceCode/${fileName}.js`,
          this.createCode('sourceCode', this.createZIPBySourceCode(fileName))
        )
      )
    );

    return Promise.all(events);
  }

  private createCode(type: 'analyzed' | 'sourceCode', eventData: string) {
    return `document.dispatchEvent(new CustomEvent('sabik:resourceLoaded:${type}', {bubbles: true, detail: {data: '${eventData}'}}));`;
  }

  private createZIPBySourceCode(fileName: string) {
    const sourceCoode = fs.readFileSync(`${this.rootPath}/${fileName}`);

    return this.createZIP(sourceCoode.toString());
  }

  private createZIPByAnalyzedJSON(metrics: Analyzed[]) {
    return this.createZIP(JSON.stringify(metrics));
  }

  private createZIP(text: string) {
    const buffer = Buffer.from(pako.deflate(text, { to: 'string' }), 'binary');

    return buffer.toString('base64');
  }
}
