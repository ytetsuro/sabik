export declare class Writer {
    private rootPath;
    constructor(rootPath: string);
    write(filePath: string, value: string): Promise<void>;
}
