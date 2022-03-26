import { FileBuilder } from './FileBuilder';
import { Metrics } from '../Analyzer/Metrics/Metrics';
export declare class Reporter {
    private readonly builders;
    private readonly outputPath?;
    constructor(builders: FileBuilder[], outputPath?: string | undefined);
    output(metrics: Metrics[]): Promise<void>;
}
