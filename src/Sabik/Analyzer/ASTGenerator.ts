import { ASTGenerator as IASTGenerator } from '../ASTGenerator';
import { File } from '../FileFinder/File';

export class ASTGenerator {
  constructor(private map: Map<string, IASTGenerator>) {}

  generate(file: File) {
    if (!this.map.has(file.extension)) {
      throw new Error('Not found generator.');
    }

    return this.map.get(file.extension)!.generate(file.fullPath);
  }
}
