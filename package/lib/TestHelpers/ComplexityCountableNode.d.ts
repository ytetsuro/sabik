declare type Config = {
    DSL: string;
    children?: Config[];
};
export declare class ComplexityCountableNode {
    private DSL;
    private children;
    constructor({ DSL, children }: Config);
    isIncrement(): boolean;
    isNestLevelUp(): boolean;
    isNestingIncrement(): boolean;
    getChildren(): ComplexityCountableNode[];
}
export {};
