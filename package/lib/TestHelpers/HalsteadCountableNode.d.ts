declare type Config = {
    DSL: string;
    text: string;
    children?: Config[];
};
export declare class HalsteadCountableNode {
    private DSL;
    private text;
    private children;
    constructor({ DSL, text, children }: Config);
    isOperator(): boolean;
    isOperand(): boolean;
    getText(): string;
    getChildren(): HalsteadCountableNode[];
}
export {};
