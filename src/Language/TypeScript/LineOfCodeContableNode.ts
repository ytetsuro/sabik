import { injectable } from 'inversify';
import * as ts from 'typescript';
import { LineOfCodeCountableNode as LineOfCodeCountableNodeInterface } from '../../Calculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { ASTNode } from './ASTNode';

@injectable()
export class LineOfCodeCountableNode
  implements LineOfCodeCountableNodeInterface {
  private readonly pureNode: ts.Node;

  constructor(node: ASTNode) {
    this.pureNode = node.node;
  }

  getText() {
    return this.pureNode.getFullText();
  }

  getRemovedCommentAndEmptyLineText() {
    const sourceFile = ts.createSourceFile(
      'dummy.ts',
      this.pureNode.getFullText(),
      ts.ScriptTarget.ES2016,
      /* setParentNodes */ true
    );

    return ts.createPrinter({ removeComments: true }).printFile(sourceFile);
  }
}
