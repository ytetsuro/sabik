import { ASTNode } from '../Adapter/ASTNode';
export declare class CodePointType {
    private readonly scaler;
    static readonly File: CodePointType;
    static readonly Class: CodePointType;
    static readonly FauxClass: CodePointType;
    static readonly Method: CodePointType;
    private constructor();
    isMoreDetail(codePoint: CodePointType): boolean;
    static castAs(astNode: ASTNode): CodePointType;
    valueOf(): number;
}
