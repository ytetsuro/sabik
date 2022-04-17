import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { dirname } from 'path';
import { Types } from '../types/Types';

@injectable()
export class Writer {
  constructor(@inject(Types.outputPath) private rootPath: string) {
    if (!rootPath || (fs.existsSync(rootPath) && !fs.statSync(rootPath).isDirectory())) {
      throw new Error(`The file path is specified.Please specify the directory path.`);
    }
  }

  async write(filePath: string, value: string) {
    const fullFilePath = `${this.rootPath}/${filePath}`;

    fs.mkdirSync(dirname(fullFilePath), { recursive: true });

    return fs.writeFileSync(fullFilePath, value);
  }
}
