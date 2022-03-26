import { Analyzer } from '../../Analyzer/Analyzer';
import { LanguageAnalyzer } from '../Analyzer/LanguageAnalyzer';
export declare class TypeScript extends LanguageAnalyzer {
    readonly extensions: string[];
    constructor(analyzer: Analyzer);
}
