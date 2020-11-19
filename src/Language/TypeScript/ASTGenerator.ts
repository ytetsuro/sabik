import * as ts from 'typescript';
import { ASTGenerator as ASTGeneratorInterface } from '../../Sabik/ASTGenerator';
import { readFileSync } from 'fs';
import { ASTNode } from './ASTNode';

export class ASTGenerator implements ASTGeneratorInterface {
  generate(filePath: string) {
    const node = ts.createSourceFile(
      filePath,
      readFileSync(filePath).toString(),
      ts.ScriptTarget.ES2016,
      /* setParentNodes */ true
    );

    return new ASTNode(node, node);
  }
}
