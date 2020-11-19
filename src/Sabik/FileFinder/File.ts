import { extname } from 'path';

export class File {
  constructor(
    public readonly fullPath: string,
    public readonly relativePath: string
  ) {}

  get extension() {
    return extname(this.fullPath);
  }
}
