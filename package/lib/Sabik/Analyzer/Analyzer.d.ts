import { File } from '../../Analyzer/Adapter/File';
import { LanguageAnalyzer } from './LanguageAnalyzer';
export declare class Analyzer {
    private readonly analyzers;
    constructor(analyzers: LanguageAnalyzer[]);
    analyze(files: File[]): import("../../Analyzer/Metrics/Metrics").Metrics[];
}
