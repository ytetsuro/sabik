import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { dirname } from 'path';
import { Types } from '../types/Types';

@injectable()
export class Writer {
  constructor(@inject(Types.outputPath) private outputPath: string) {
    if (!outputPath || (fs.existsSync(outputPath) && !fs.statSync(outputPath).isDirectory())) {
      throw new Error(`The file path is specified.Please specify the directory path.`);
    }
  }

  async write(filePath: string, value: string) {
    const fullFilePath = `${this.outputPath}/${filePath}`;

    fs.mkdirSync(dirname(fullFilePath), { recursive: true });

    return fs.writeFileSync(fullFilePath, value);
  }
}
