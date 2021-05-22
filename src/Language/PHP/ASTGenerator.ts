import {Engine} from 'php-parser';
import { readFileSync } from 'fs';
import { ASTGenerator as ASTGeneratorInterface } from '../../Analyzer/Adapter/ASTGenerator';
import { ASTNode } from './ASTNode';
import { injectable } from 'inversify';
import { File } from '../../Analyzer/Adapter/File';

@injectable()
export class ASTGenerator implements ASTGeneratorInterface {
  private engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true,
      withSource: true,
    },
  });

  generate(file: File) {
    const node = this.engine.parseCode(
      readFileSync(file.fullPath).toString(),
      file.fullPath
    );

    return new ASTNode(node, node);
  }
}
