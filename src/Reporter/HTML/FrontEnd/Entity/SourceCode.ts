export class SourceCode {
    constructor(
        public readonly filePath: string,
        public readonly sourceCode: string) {
        }

    get extension(): string {
        return <string>(this.filePath.split('.').slice(-1)[0]);
    }
}