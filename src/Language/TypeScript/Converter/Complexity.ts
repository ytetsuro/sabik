import { injectable } from 'inversify';
import { ASTNode } from '../ASTNode';
import { ComplexityCountableNode } from '../ComplexityCountableNode';

@injectable()
export class Complexity {
  convert(astNode: ASTNode) {
    return new ComplexityCountableNode(astNode);
  }
}
