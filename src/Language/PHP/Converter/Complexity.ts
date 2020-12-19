import { ASTNode } from '../ASTNode';
import { ComplexityCountableNode } from '../ComplexityCountableNode';

export class Complexity {
  convert(astNode: ASTNode) {
    return new ComplexityCountableNode(astNode);
  }
}
