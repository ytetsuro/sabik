type Config = {
  DSL: string;
  text: string;
  children?: Config[];
};

export class HalsteadCountableNode {
  private DSL: string;
  private text: string;
  private children: Config[];

  constructor({ DSL, text, children = [] }: Config) {
    this.DSL = DSL;
    this.text = text;
    this.children = children;
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

  getChildren() {
    return this.children.map((config) => new HalsteadCountableNode(config));
  }
}
