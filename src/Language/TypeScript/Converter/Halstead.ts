import { ASTNode } from '../ASTNode';
import { HalsteadCountableNode } from '../HalsteadCountableNode';

export class Halstead {
  convert(astNode: ASTNode) {
    return new HalsteadCountableNode(astNode);
  }
}
