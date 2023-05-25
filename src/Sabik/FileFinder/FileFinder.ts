import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { resolve, sep, isAbsolute } from 'path';
import { Types } from '../../types/Types';
import { File } from './File';

@injectable()
export class FileFinder {
  private currentPath: string;

  private findSource: RegExp;

  private excludes: RegExp[];

  constructor(
    @inject(Types.rootPath) currentPath: string,
    @inject(Types.fileMatches) findSource: RegExp,
    @inject(Types.fileExcludes) excludes: RegExp[]
  ) {
    this.currentPath = currentPath.endsWith(sep) ? currentPath.substr(0, currentPath.length - 1) : currentPath;
    this.findSource = findSource;
    this.excludes = excludes;
  }

  find(findPath: string) {
    let result: File[] = [];
    const fullPath = this.getFullPath(findPath);

    if (fs.lstatSync(fullPath).isDirectory()) {
      result = result.concat(...this.findByDirectoryPath(fullPath));
    } else if (this.isTarget(fullPath)) {
      result.push(this.createFindResult(fullPath));
    }

    return result;
  }

  private findByDirectoryPath(path: string) {
    return fs.readdirSync(path).map((row) => this.find(`${path}${sep}${row}`));
  }

  private createFindResult(path: string) {
    return new File(path, path.substr(this.currentPath.length + 1));
  }

  private getFullPath(path: string) {
    const formattedPath = path.endsWith(sep) ? path.substr(0, path.length - 1) : path;

    return resolve(isAbsolute(path) ? formattedPath : `${this.currentPath}${sep}${formattedPath}`);
  }

  private isTarget(path: string) {
    return fs.lstatSync(path).isFile() && this.findSource.test(path) && !this.isExcludePath(path);
  }

  private isExcludePath(path: string) {
    return !!this.excludes.find((exclude) => exclude.test(path));
  }
}
