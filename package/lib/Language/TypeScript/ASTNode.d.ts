import * as ts from 'typescript';
import { ASTNode as ASTNodeInterface } from '../../Analyzer/Adapter/ASTNode';
export declare class ASTNode implements ASTNodeInterface {
    private readonly sourceFile;
    private static readonly functionSyntaxKinds;
    private static readonly methodSyntaxKinds;
    readonly node: ts.Node;
    constructor(node: ts.Node, sourceFile: ts.SourceFile);
    isClass(): boolean;
    isMethod(): boolean;
    getName(): string;
    isFunction(): boolean;
    isFauxClass(): boolean;
    getStartLineNumber(): number;
    getEndLineNumber(): number;
    private isPossibleFauxClass;
    private getFunctionName;
    private getVariableName;
    private getPropertyName;
    private getPropertyAssignName;
    private findPropertyAssignName;
    getChildren(): ASTNode[];
}
