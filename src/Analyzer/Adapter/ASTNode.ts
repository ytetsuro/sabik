export interface ASTNode
{
    getChilds(): ASTNode[];
    isFunction(): boolean;
    isFauxClass(): boolean;
    isMethod(): boolean;
    isClass(): boolean;
    getStartLineNumber(): number;
    getEndLineNumber(): number;
    getName(): string;
}
