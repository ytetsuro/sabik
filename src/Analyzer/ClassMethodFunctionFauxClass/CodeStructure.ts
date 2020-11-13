import {CodeStructureType} from './CodeStructureType'

export interface CodeStructure {
    readonly type: CodeStructureType;
    readonly name: string;
    readonly startLineNumber: number;
    readonly endLineNumber: number;
}
