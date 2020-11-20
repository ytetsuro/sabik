import * as ts from 'typescript';
import { LineOfCodeCountableNode as LineOfCodeCountableNodeInterface } from '../../Calculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { ASTNode } from './ASTNode';

export class LineOfCodeCountableNode
  implements LineOfCodeCountableNodeInterface {
  private readonly pureNode: null;

  constructor(node: ASTNode) {
    this.pureNode = null;
  }

  getText() {
    return '';
  }

  getRemovedCommentAndEmptyLineText() {
    return '';
  }
}
