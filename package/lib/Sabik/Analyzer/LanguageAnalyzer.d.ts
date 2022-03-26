import { File } from '../../Analyzer/Adapter/File';
import { Analyzer } from '../../Analyzer/Analyzer';
export declare abstract class LanguageAnalyzer {
    private readonly analyzer;
    abstract readonly extensions: string[];
    constructor(analyzer: Analyzer);
    analyze(files: File[]): import("../../Analyzer/Metrics/Metrics").Metrics[];
}
