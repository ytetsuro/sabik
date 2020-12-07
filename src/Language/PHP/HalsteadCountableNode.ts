import { HalsteadCountableNode as HalsteadCountableNodeInterface } from '../../Calculator/Halstead/Adapter/HalsteadCountableNode';
import { ASTNode } from './ASTNode';
import {ASTKind} from './ASTKind';

export class HalsteadCountableNode implements HalsteadCountableNodeInterface {
  private readonly pureNode: null;

  private readonly identifierKinds = [
    ASTKind.IDENTIFIER,
    ASTKind.VARIABLE,
  ];

  private readonly literalKinds = [
    ASTKind.STRING,
    ASTKind.NUMBER,
    ASTKind.BOOLEAN,
    ASTKind.MAGICAL_DEFINE,
    ASTKind.NAME,
    ASTKind.HERE_DOC,
  ];

  private readonly keywordLiteralKinds = [
    ASTKind.BIN,
    ASTKind.CAST,
    ASTKind.TYPE_REFERENCE,
    ASTKind.NULL,
    ASTKind.HALT,
    ASTKind.CASE,
    ASTKind.CLONE,
    ASTKind.CONSTANT,
    ASTKind.CONTINUE,
    ASTKind.DECLARE,
    ASTKind.EXIT,
    ASTKind.EMPTY,
    ASTKind.EVAL,
    ASTKind.GLOBAL,
    ASTKind.INCLUDE,
    ASTKind.TRAIT_PRECEDENCE,
    ASTKind.TRAIT_ALIAS,
    ASTKind.INTERFACE,
    ASTKind.ISSET,
    ASTKind.LIST,
    ASTKind.NAMESPACE,
    ASTKind.NEW,
    ASTKind.RETURN,
    ASTKind.STATIC,
    ASTKind.THROW,
    ASTKind.UNSET,
    ASTKind.USE,
    ASTKind.YIELD,
    ASTKind.YIELD_FROM,
  ];

  constructor(private readonly node: ASTNode) {
    this.pureNode = null;
  }

  isOperand(): boolean {
    return this.isIdentifier() || this.isLiteral();
  }

  isOperator(): boolean {
    return false;
  }

  getText(): string {
    return '';
  }

  getChildren() {
    return this.node.getChildren().map((row) => new HalsteadCountableNode(row));
  }

  private isIdentifier() {
    return this.identifierKinds.includes(this.node.kind);
  }

  private isLiteral() {
    return this.literalKinds.includes(this.node.kind);
  }


}
