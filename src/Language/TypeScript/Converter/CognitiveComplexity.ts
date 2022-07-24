import { injectable } from 'inversify';
import { ASTNode } from '../ASTNode';
import { CognitiveComplexityCountableNode } from '../CognitiveComplexityCountableNode';

@injectable()
export class Complexity {
  convert(astNode: ASTNode) {
    return new CognitiveComplexityCountableNode(astNode);
  }
}
