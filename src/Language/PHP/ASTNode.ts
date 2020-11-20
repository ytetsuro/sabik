import * as PHPParser from 'php-parser';
import { ASTNode as ASTNodeInterface } from '../../Analyzer/Adapter/ASTNode';

type Node = PHPParser.Program|PHPParser.Node|PHPParser.Block;

enum Kind {
  CLASS = 'class',
};

export class ASTNode implements ASTNodeInterface {
  readonly node: Node;

  constructor(node: Node) {
    this.node = node;
  }

  isClass() {
    return this.node.kind === Kind.CLASS;
  }

  isMethod() {
    return false;
  }

  getName() {
    return '';
  }

  isFunction() {
    return false;
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
    return []
  }
}
