type Config = {
  DSL: string;
  children?: Config[];
};

export class ComplexityCountableNode {
  private DSL: string;
  private children: Config[];

  constructor({ DSL, children = [] }: Config) {
    this.DSL = DSL;
    this.children = children;
  }

  isIncrement() {
    return this.DSL.includes('I');
  }

  isNestLevelUp() {
    return this.DSL.includes('N');
  }

  isNestingIncrement() {
    return this.DSL.includes('I') && this.DSL.includes('N');
  }

  getChildren() {
    return this.children.map((config) => new ComplexityCountableNode(config));
  }
}
