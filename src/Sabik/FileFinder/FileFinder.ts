import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { resolve } from 'path';
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
    this.currentPath = currentPath.endsWith('/')
      ? currentPath.substr(0, currentPath.length - 1)
      : currentPath;
    this.findSource = findSource;
    this.excludes = excludes;
  }

  find(findPath: string) {
    let result: File[] = [];
    const fullPath = this.getFullPath(findPath);

    if (fs.statSync(fullPath).isDirectory()) {
      result = result.concat(...this.findByDirectoryPath(fullPath));
    } else if (this.isTarget(fullPath)) {
      result.push(this.createFindResult(fullPath));
    }

    return result;
  }

  private findByDirectoryPath(path: string) {
    return fs.readdirSync(path).map((row) => this.find(`${path}/${row}`));
  }

  private createFindResult(path: string) {
    return new File(path, path.substr(this.currentPath.length + 1));
  }

  private getFullPath(path: string) {
    return resolve(path.startsWith('/') ? path : `${this.currentPath}/${path}`);
  }

  private isTarget(path: string) {
    return (
      fs.statSync(path).isFile() &&
      this.findSource.test(path) &&
      !this.isExcludePath(path)
    );
  }

  private isExcludePath(path: string) {
    return !!this.excludes.find((exclude) => exclude.test(path));
  }
}
