type Config = {
    DSL: string,
    childs?: Config[]
}

export class ComplexityCountableNode
{
    private DSL: string;
    private childs: Config[];

    constructor({DSL, childs = []}: Config)
    {
        this.DSL = DSL;
        this.childs = childs;
    }

    isIncrement() {
        return this.DSL.includes('I');
    }

    isNestLevelUp() {
        return this.DSL.includes('N')
    }

    isNestingIncrement() {
         return this.DSL.includes('I') && this.DSL.includes('N');
    }

    getChilds() {
        return this.childs.map(config => new ComplexityCountableNode(config));
    }
}
