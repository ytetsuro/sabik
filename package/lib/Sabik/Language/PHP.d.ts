import { Analyzer } from '../../Analyzer/Analyzer';
import { LanguageAnalyzer } from '../Analyzer/LanguageAnalyzer';
export declare class PHP extends LanguageAnalyzer {
    readonly extensions: string[];
    constructor(analyzer: Analyzer);
}
