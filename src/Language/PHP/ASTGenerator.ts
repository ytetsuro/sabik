import Engine from 'php-parser';
import { readFileSync } from 'fs';
import { ASTGenerator as ASTGeneratorInterface } from '../../Sabik/ASTGenerator';
import { ASTNode } from './ASTNode';

export class ASTGenerator implements ASTGeneratorInterface {
  private engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true,
      withSource: true,
    }
  });

  generate(filePath: string) {
    const node = this.engine.parseCode(
      readFileSync(filePath).toString(),
      filePath
    );

    return new ASTNode(node);
  }
}
