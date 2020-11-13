import { CodeMetrics } from '../../Analyzer/ClassMethodFunctionFauxClass/CodeMetrics';
import { LineOfCode } from '../../Calculator/LineOfCode/LineOfCode';
import { Metrics } from './Metrics';

export class Analyzed {
    constructor(
        readonly fileName: string,
        readonly codeMetricsList: CodeMetrics<Metrics>[],
        readonly lineOfCode: LineOfCode
    ) {};

    size() {
        return this.codeMetricsList.length;
    }

    toJSON() {
        return {
            fileName: this.fileName,
            lineOfCode: this.lineOfCode,
            metrics: this.codeMetricsList,
        };
    }
}