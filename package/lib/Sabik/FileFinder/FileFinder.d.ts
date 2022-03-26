import { File } from './File';
export declare class FileFinder {
    private currentPath;
    private findSource;
    private excludes;
    constructor(currentPath: string, findSource: RegExp, excludes: RegExp[]);
    find(findPath: string): File[];
    private findByDirectoryPath;
    private createFindResult;
    private getFullPath;
    private isTarget;
    private isExcludePath;
}
