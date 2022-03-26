import { Metrics } from '../Analyzer/Metrics/Metrics';
export declare class MetricsFactory {
    private readonly separator;
    private readonly metricsValueMap;
    create(...DSLList: string[]): Metrics[];
    private createFile;
    private createCodePoints;
    private createMetricsValues;
}
