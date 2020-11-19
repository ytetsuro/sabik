import postcss from 'postcss';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import { Writer } from '../Writer';
import { inject, injectable } from 'inversify';

@injectable()
export class CSS {
  constructor(@inject(Writer) private writer: Writer) {}

  async build() {
    const filePath = `${__dirname}/../FrontEnd/app.css`;
    const sourceCoode = fs.readFileSync(filePath);
    const css = new Promise<string>((resolve) => {
      postcss([autoprefixer])
        .use(atImport())
        .process(sourceCoode, { from: filePath })
        .then((result) => {
          resolve(result.css);
        });
    });

    return this.writer.write('index.css', await css);
  }
}
