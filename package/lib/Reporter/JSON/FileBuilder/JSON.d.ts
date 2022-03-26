import { Metrics } from '../../../Analyzer/Metrics/Metrics';
import { FileBuilder } from '../../FileBuilder';
export declare class JSON implements FileBuilder {
    private outputStream;
    constructor(outputPath?: string);
    build(metrics: Metrics[]): Promise<void>;
}
