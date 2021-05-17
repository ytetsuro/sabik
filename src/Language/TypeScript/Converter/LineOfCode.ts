import { injectable } from 'inversify';
import { ASTNode } from '../ASTNode';
import { LineOfCodeCountableNode } from '../LineOfCodeContableNode';

@injectable()
export class LineOfCode {
  convert(astNode: ASTNode) {
    return new LineOfCodeCountableNode(astNode);
  }
}
