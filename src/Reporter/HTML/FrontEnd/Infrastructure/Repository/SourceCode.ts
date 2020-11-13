import { ResourceLoader } from '../ResourceLoader';
import { SourceCode as Entity } from '../../Entity/SourceCode';

export class SourceCode {
    constructor(private resourceLoader : ResourceLoader) {
    }

    async get(filePath: string) {
        return new Entity(
            filePath,
            await this.resourceLoader.load('sourceCode', `sourceCode/${filePath}`)
        );
    }
}