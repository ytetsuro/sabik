import { Analyzed } from '../../../Sabik/Analyzer/Analyzed';

export interface FileBuilder {
    build(metrics: Analyzed[]): Promise<void|void[]>
}