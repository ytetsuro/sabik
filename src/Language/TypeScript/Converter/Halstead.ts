import { injectable } from 'inversify';
import { ASTNode } from '../ASTNode';
import { HalsteadCountableNode } from '../HalsteadCountableNode';

@injectable()
export class Halstead {
  convert(astNode: ASTNode) {
    return new HalsteadCountableNode(astNode);
  }
}
