declare type NodeSource = {
    [key: string]: NodeSource;
};
export declare class ASTNode {
    private structureType;
    private startLine;
    private endLine;
    private name;
    private children;
    constructor(DSL: string, children?: NodeSource);
    isClass(): boolean;
    isFauxClass(): boolean;
    isMethod(): boolean;
    isFunction(): boolean;
    getName(): string;
    getStartLineNumber(): number;
    getEndLineNumber(): number;
    getChildren(): ASTNode[];
}
export {};
