import { Writer } from '../Writer';
import { Metrics } from '../../../Analyzer/Metrics/Metrics';
export declare class Event {
    private writer;
    private rootPath;
    constructor(writer: Writer, rootPath: string);
    build(metrics: Metrics[]): Promise<void[]>;
    private createCode;
    private createZIPBySourceCode;
    private createZIPByAnalyzedJSON;
    private createZIP;
}
