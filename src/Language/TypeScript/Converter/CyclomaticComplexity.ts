import { injectable } from 'inversify';
import { ASTNode } from '../ASTNode';
import { CyclomaticComplexityCountableNode } from '../CyclomaticComplexityCountableNode';

@injectable()
export class Complexity {
  convert(astNode: ASTNode) {
    return new CyclomaticComplexityCountableNode(astNode);
  }
}
