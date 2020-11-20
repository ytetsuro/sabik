import { ASTNode } from '../ASTNode';
import { LineOfCodeCountableNode } from '../LineOfCodeContableNode';

export class LineOfCode {
  convert(astNode: ASTNode) {
    return new LineOfCodeCountableNode(astNode);
  }
}
