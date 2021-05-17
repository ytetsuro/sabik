import { injectable, inject } from 'inversify';
import { ScriptBuilder } from '../ScriptBuilder';
import { Writer } from '../Writer';

@injectable()
export class EntryPoint {
  constructor(
    @inject(Writer) private writer: Writer,
    @inject(ScriptBuilder) private scriptBuilder: ScriptBuilder
  ) {}

  async build() {
    const script = await this.scriptBuilder.build(
      `${__dirname}/../FrontEnd/Bootstrap.ts`
    );

    return this.writer.write('app.js', script);
  }
}
