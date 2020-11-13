type Config = {
    DSL: string,
    text: string,
    childs?: Config[],
};

export class HalsteadCountableNode {
    private DSL: string;
    private text: string;
    private childs: Config[]

    constructor({DSL, text, childs = []}: Config) {
        this.DSL = DSL;
        this.text = text;
        this.childs = childs;
    }

    isOperator() {
        return this.DSL.includes('T');
    }

    isOperand() {
        return this.DSL.includes('N');
    }

    getText() {
        return this.text;
    }

    getChilds() {
        return this.childs.map(config => new HalsteadCountableNode(config));
    }
}