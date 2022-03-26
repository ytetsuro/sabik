import { CodePointType } from './CodePointType';
export declare class CodePoint {
    readonly type: CodePointType;
    readonly name: string;
    readonly startLineNumber: number;
    readonly endLineNumber: number;
    constructor(type: CodePointType, name: string, startLineNumber: number, endLineNumber: number);
}
