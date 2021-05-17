import * as ts from 'typescript';
import { ASTGenerator as ASTGeneratorInterface } from '../../Analyzer/Adapter/ASTGenerator';
import { readFileSync } from 'fs';
import { ASTNode } from './ASTNode';
import { injectable } from 'inversify';
import { File } from '../../Analyzer/Adapter/File';

@injectable()
export class ASTGenerator implements ASTGeneratorInterface {
  generate(file: File) {
    const node = ts.createSourceFile(
      file.fullPath,
      readFileSync(file.fullPath).toString(),
      ts.ScriptTarget.ES2016,
      /* setParentNodes */ true
    );

    return new ASTNode(node, node);
  }
}
