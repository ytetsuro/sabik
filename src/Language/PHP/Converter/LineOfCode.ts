import { ASTNode } from '../ASTNode';
import { LineOfCodeCountableNode } from '../LineOfCodeCountableNode';

export class LineOfCode {
  convert(astNode: ASTNode) {
    return new LineOfCodeCountableNode(astNode);
  }
}
