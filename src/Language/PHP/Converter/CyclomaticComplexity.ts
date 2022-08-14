import { injectable } from 'inversify';
import { ASTNode } from '../ASTNode';
import { CyclomaticComplexityCountableNode } from '../CyclomaticComplexityCountableNode';

@injectable()
export class CyclomaticComplexity {
  convert(astNode: ASTNode) {
    return new CyclomaticComplexityCountableNode(astNode);
  }
}
