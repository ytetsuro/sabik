import { LineOfCodeCountableNode as LineOfCodeCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { ASTNode } from './ASTNode';
export declare class LineOfCodeCountableNode implements LineOfCodeCountableNodeInterface {
    private readonly pureNode;
    constructor(node: ASTNode);
    getText(): string;
    getRemovedCommentAndEmptyLineText(): string;
}
