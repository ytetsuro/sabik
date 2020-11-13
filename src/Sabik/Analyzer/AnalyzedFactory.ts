import { CodeMetrics } from '../../Analyzer/ClassMethodFunctionFauxClass/CodeMetrics';
import { Metrics } from './Metrics';
import { Analyzed } from './Analyzed';
import { LineOfCode } from '../../Calculator/LineOfCode/LineOfCode';

export class AnalyzedFactory {
    private fileName: string|null = null;
    private lineOfCode: LineOfCode|null = null;

    setFileMeta(fileName: string, lineOfCode: LineOfCode) {
        this.fileName = fileName;
        this.lineOfCode = lineOfCode;
    }

    create(codeMetricsList: CodeMetrics<Metrics>[]): Analyzed {
        if (!this.fileName || !this.lineOfCode) {
            throw new Error('Not found fileName or lineOfCode.');
        }

        return new Analyzed(this.fileName, codeMetricsList, this.lineOfCode);
    }
}