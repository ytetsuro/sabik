import * as ts from 'typescript';
import { HalsteadCountableNode as HalsteadCountableNodeInterface } from '../../Calculator/Halstead/Adapter/HalsteadCountableNode';
import { ASTNode } from './ASTNode';

export class HalsteadCountableNode implements HalsteadCountableNodeInterface {
  private readonly pureNode: ts.Node;

  constructor(private readonly node: ASTNode) {
    this.pureNode = node.node;
  }

  isOperand(): boolean {
    return this.isIdentifier() || this.isLiteral();
  }

  isOperator(): boolean {
    return this.isKeyword() || this.isToken();
  }

  private isIdentifier() {
    return this.pureNode.kind === ts.SyntaxKind.Identifier;
  }

  private isLiteral() {
    return this.isBetweenKind(
      ts.SyntaxKind.FirstLiteralToken,
      ts.SyntaxKind.LastLiteralToken
    );
  }

  private isToken() {
    return this.isBetweenKind(
      ts.SyntaxKind.FirstPunctuation,
      ts.SyntaxKind.LastPunctuation
    );
  }

  private isKeyword() {
    return this.isBetweenKind(
      ts.SyntaxKind.FirstKeyword,
      ts.SyntaxKind.LastKeyword
    );
  }

  private isBetweenKind(before: ts.SyntaxKind, after: ts.SyntaxKind) {
    const kind = this.pureNode.kind;

    return before <= kind && kind <= after;
  }

  getText(): string {
    if (this.isOperand()) {
      return String((<any>this.pureNode).text || this.pureNode.kind);
    }
    if (this.isOperator()) {
      return String((<any>this.pureNode).getText());
    }

    return '';
  }

  getChilds() {
    return this.node.getChilds().map((row) => new HalsteadCountableNode(row));
  }
}
