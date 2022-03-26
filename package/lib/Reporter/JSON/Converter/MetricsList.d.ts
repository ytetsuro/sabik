import { Metrics } from '../../../Analyzer/Metrics/Metrics';
export declare class MetricsList {
    private readonly metricsList;
    constructor(metricsList: Metrics[]);
    toJSON(): {
        fileName: string;
        name: string;
        codePointType: number;
        startLineNumber: number;
        endLineNumber: number;
        metricsList: {
            type: number;
            typeLabel: string;
            value: number;
        }[];
    }[];
}
