export declare class File {
    readonly fullPath: string;
    readonly relativePath: string;
    constructor(fullPath: string, relativePath: string);
    get extension(): string;
}
