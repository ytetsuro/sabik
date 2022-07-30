import { injectable } from 'inversify';
import { ASTNode } from '../ASTNode';
import { CognitiveComplexityCountableNode } from '../CognitiveComplexityCountableNode';

@injectable()
export class CognitiveComplexity {
  convert(astNode: ASTNode) {
    return new CognitiveComplexityCountableNode(astNode);
  }
}
