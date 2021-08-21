type NodeSource = { [key: string]: NodeSource };

export class ASTNode {
  private structureType: string;
  private startLine: number = 0;
  private endLine: number = 0;
  private name: string;
  private children: NodeSource;

  constructor(DSL: string, children: NodeSource = {}) {
    const [structureType, name, startLine, endLine] = DSL.split(':', 4);

    this.structureType = structureType;
    this.name = name;
    this.startLine = Number(startLine);
    this.endLine = Number(endLine);
    this.children = children;
  }

  isClass() {
    return this.structureType === 'C';
  }

  isFauxClass() {
    return this.structureType === 'D';
  }

  isMethod() {
    return this.structureType === 'M';
  }

  isFunction() {
    return this.structureType === 'F' || this.isMethod() || this.isFauxClass();
  }

  getName() {
    return this.name;
  }

  getStartLineNumber() {
    return this.startLine;
  }

  getEndLineNumber() {
    return this.endLine;
  }

  getChildren() {
    return Object.keys(this.children).map((keyName) => new ASTNode(keyName, this.children[keyName]));
  }
}
