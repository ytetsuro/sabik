import { Metrics } from '../../../Analyzer/Metrics/Metrics';
export declare class Summaries {
    private readonly methodCalculator;
    private readonly fileCalculator;
    private readonly summaries;
    constructor(metrics: Metrics[]);
    toJSON(): {};
    private convertSummary;
}
