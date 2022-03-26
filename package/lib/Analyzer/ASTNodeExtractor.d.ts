import { ASTNode } from './Adapter/ASTNode';
import { CodePoint } from './Metrics/CodePoint';
declare type AnalyzePointNode = {
    astNode: ASTNode;
    codePoints: CodePoint[];
};
export declare class ASTNodeExtractor {
    private cache;
    extractMethods(astNode: ASTNode): AnalyzePointNode[];
    clear(): void;
    private generateMethodAnalyzePointNodes;
    private findMethodAll;
    private createCodePoint;
    private createAnalyzePointNode;
    private extractClassNode;
    private extractFunctionAndMethodNode;
}
export {};
