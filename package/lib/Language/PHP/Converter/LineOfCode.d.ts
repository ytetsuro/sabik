import { ASTNode } from '../ASTNode';
import { LineOfCodeCountableNode } from '../LineOfCodeCountableNode';
export declare class LineOfCode {
    convert(astNode: ASTNode): LineOfCodeCountableNode;
}
