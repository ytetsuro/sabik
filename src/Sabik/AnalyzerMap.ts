import { injectable } from 'inversify';
import { Analyzer } from './Analyzer/Analyzer';
import { LanguageConverter } from './Analyzer/LanguageConverter';

@injectable()
export class AnalyzerMap {
    constructor(private map: Map<string, Analyzer> = new Map()) {
    }

    register(extension: string, config: LanguageConverter): void;
    register(extensions: string[], config: LanguageConverter): void;

    register(extensions: string[]|string, config: LanguageConverter)
    {
        if (Array.isArray(extensions)) {
            extensions.forEach(extension => {
                this.register(extension, config);
            });
            return;
        }

        this.map.set(extensions, new Analyzer(config));
    }

    has(extension: string) {
        return this.map.has(extension);
    }

    get(extension: string) {
        return this.map.get(extension);
    }
}