import { extname } from "path";
import { File } from "../Analyzer/Adapter/File";
import { CognitiveComplexity } from "../Analyzer/CodeMetricsCalculator/CognitiveComplexity/CognitiveComplexity";
import { HalsteadBugsDelivered } from "../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadBugsDelivered";
import { HalsteadDifficulty } from "../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadDifficulty";
import { HalsteadEffort } from "../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadEffort";
import { HalsteadLength } from "../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadLength";
import { HalsteadTime } from "../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadTime";
import { HalsteadVocabulary } from "../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadVocabulary";
import { HalsteadVolume } from "../Analyzer/CodeMetricsCalculator/Halstead/MetricsValue/HalsteadVolume";
import { LogicalLineOfCode } from "../Analyzer/CodeMetricsCalculator/LineOfCode/MetricsValue/LogicalLineOfCode";
import { PhysicalLineOfCode } from "../Analyzer/CodeMetricsCalculator/LineOfCode/MetricsValue/PhysicalLineOfCode";
import { Maintainability } from "../Analyzer/CodeMetricsCalculator/Maintainability/Maintainability";
import { CodePoint } from "../Analyzer/Metrics/CodePoint";
import { CodePointType } from "../Analyzer/Metrics/CodePointType";
import { Metrics } from "../Analyzer/Metrics/Metrics";
import { MetricsValue, MetricsValueConstructor } from "../Analyzer/Metrics/MetricsValue";
import { getDouble } from "./getDouble";

export class MetricsFactory {
    private readonly separator = '|';
    private readonly metricsValueMap = new Map<string, MetricsValueConstructor>([
        ['CC', CognitiveComplexity],
        ['HB', HalsteadBugsDelivered],
        ['HD', HalsteadDifficulty],
        ['HE', HalsteadEffort],
        ['HL', HalsteadLength],
        ['HT', HalsteadTime],
        ['HV', HalsteadVocabulary],
        ['Hv', HalsteadVolume],
        ['M', Maintainability],
        ['LL', LogicalLineOfCode],
        ['LP', PhysicalLineOfCode],
    ]);

    create(...DSLList: string[]): Metrics[] {
        return DSLList.map(DSL => new Metrics(
            this.createFile(DSL),
            this.createCodePoints(DSL),
            this.createMetricsValues(DSL),
        ));
    }

    private createFile(DSL: string): File {
        const fullPath = (DSL.split(this.separator, 1)?.[0] ?? '');

        return {
            fullPath,
            relativePath: fullPath,
            extension: extname(fullPath),
        };
    }

    private createCodePoints(DSL: string): CodePoint[] {
        const [typeDSL, name, startLineNumber, endLineNumber] = (DSL.split(this.separator)?.[1] ?? '').split(' ');
        const file = this.createFile(DSL);
        const result = [new CodePoint(CodePointType.File, file.fullPath, 0, 10000)];
        const args = [name, Number(startLineNumber), Number(endLineNumber)] as const;

        switch ((typeDSL)) {
            case 'F':
                return [
                    new CodePoint(CodePointType.File, ...args),
                ];
            case 'C':
                result.push(
                    new CodePoint(CodePointType.Class, ...args),
                );
                break;
            case 'M':
                result.push(
                    new CodePoint(CodePointType.Class, 'dummyClass', 0, 1000),
                    new CodePoint(CodePointType.Method, ...args),
                );
                break;
            case 'f':
                result.push(
                    new CodePoint(CodePointType.Method, ...args),
                );
                break;
        }

        return result;
    }

    private createMetricsValues(DSL: string): MetricsValue[] {
        const metricsValuesSeed = (DSL.split(this.separator)?.[2] ?? '')
            .split(' ')
            .map(row => row.split(':'))
            .map(([type, value]) => ({type, value: Number(value)}));

        return metricsValuesSeed
            .filter(({type}) => this.metricsValueMap.has(type))
            .map(({type, value}) => getDouble(this.metricsValueMap.get(type)!, {valueOf: value}))
    }
}