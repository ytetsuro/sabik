import * as PHPParser from 'php-parser';
import { ASTNode as ASTNodeInterface } from '../../Analyzer/Adapter/ASTNode';

type Node = PHPParser.Program|PHPParser.Node|PHPParser.Block;

enum Kind {
  CLASS = 'class',
  TRAIT = 'trait',
  METHOD = 'method',
  FUNCTION = 'function',
  ALLOW_FUNCTION = 'arrowfunc',
};

export class ASTNode implements ASTNodeInterface {
  constructor(
    public readonly node: Node,
    private readonly parentNode?: Node
  ) {}

  isClass() {
    return [Kind.CLASS, Kind.TRAIT].includes(<Kind>this.node.kind);
  }

  isMethod() {
    return this.node.kind === Kind.METHOD;
  }

  getName() {
    return '';
  }

  isFunction() {
    return [Kind.FUNCTION, Kind.ALLOW_FUNCTION, Kind.CLOSURE].includes(<Kind>this.node.kind);
  }

  isFauxClass() {
    return false;
  }

  getStartLineNumber() {
    return 0;
  }

  getEndLineNumber() {
    return 0;
  }

  getChilds() {
    return [...Object.values(this.node)]
      .filter(row => !!row)
      .flatMap(row => row)
      .filter(row => typeof row === 'object')
      .filter(row => typeof row.kind === 'string')
      .map(row => new ASTNode(row, this));
  }
}
