import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import {dirname} from 'path';
import { Types } from '../../types/Types';

@injectable()
export class Writer {
    constructor(@inject(Types.outputPath) private rootPath: string) {
    }

    async write(filePath: string, value: string) {
        const fullFilePath = `${this.rootPath}/${filePath}`;

        fs.mkdirSync(dirname(fullFilePath), { recursive: true });

        return fs.writeFileSync(fullFilePath, value);
    }
}