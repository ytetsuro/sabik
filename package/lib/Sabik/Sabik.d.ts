import { FileFinder } from './FileFinder/FileFinder';
import { Reporter } from './Reporter';
import { Analyzer } from './Analyzer/Analyzer';
export declare class Sabik {
    private analyzer;
    private fileFinder;
    private presenter;
    constructor(analyzer: Analyzer, fileFinder: FileFinder, presenter: Reporter);
    exec(findPath: string): void;
}
