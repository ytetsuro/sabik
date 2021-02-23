import { CodePointType } from './CodePointType';

export class CodePoint {
    constructor(
        public readonly type: CodePointType,
        public readonly name: string,
        public readonly startLineNumber: number,
        public readonly endLineNumber: number, 
    ) {
    }
}