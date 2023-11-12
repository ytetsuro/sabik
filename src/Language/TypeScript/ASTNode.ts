import * as ts from 'typescript';
import { CognitiveComplexityCountableNode } from './CognitiveComplexityCountableNode';
import { ASTNode as ASTNodeInterface } from '../../Analyzer/Adapter/ASTNode';
import { injectable } from 'inversify';

@injectable()
export class ASTNode implements ASTNodeInterface {
  private static readonly functionSyntaxKinds = [
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.FunctionExpression,
    ts.SyntaxKind.ArrowFunction,
  ];

  private static readonly methodSyntaxKinds = [
    ts.SyntaxKind.MethodDeclaration,
    ts.SyntaxKind.Constructor,
    ts.SyntaxKind.GetAccessor,
    ts.SyntaxKind.SetAccessor,
  ];

  readonly node: ts.Node;

  constructor(node: ts.Node, private readonly sourceFile: ts.SourceFile) {
    this.node = node;
  }

  isClass() {
    return this.node.kind === ts.SyntaxKind.ClassDeclaration;
  }

  isMethod() {
    return ASTNode.methodSyntaxKinds.includes(this.node.kind);
  }

  getName() {
    let result = '';
    if (this.isClass()) {
      result = (<ts.ClassDeclaration>this.node).name?.getText() ?? 'Anynomus Class';
    } else if (this.isMethod()) {
      const methodName =
        this.node.kind === ts.SyntaxKind.Constructor ? 'constructor' : (<ts.MethodDeclaration>this.node).name.getText();
      const parameters = (<ts.MethodDeclaration>this.node).parameters.map((row) => row.name.getText()).join(',');
      result = `${methodName}(${parameters})`;
    } else if (this.isFunction()) {
      return this.getFunctionName();
    }

    return result;
  }

  isFunction() {
    return ASTNode.functionSyntaxKinds.includes(this.node.kind);
  }

  isFauxClass() {
    if (!this.isPossibleFauxClass()) {
      return false;
    }

    return (
      new ASTNode((<ts.FunctionExpression>this.node).body, this.sourceFile)
        .getChildren()
        .filter((row) => new CognitiveComplexityCountableNode(row).isIncrement() && !row.isFunction()).length === 0
    );
  }

  getStartLineNumber() {
    return this.sourceFile.getLineAndCharacterOfPosition(this.node.getStart()).line;
  }

  getEndLineNumber() {
    return this.sourceFile.getLineAndCharacterOfPosition(this.node.getEnd()).line;
  }

  private isPossibleFauxClass() {
    if (this.node.kind === ts.SyntaxKind.ArrowFunction) {
      return false;
    }
    if (this.node.kind === ts.SyntaxKind.FunctionDeclaration && (<ts.FunctionDeclaration>this.node).name) {
      return true;
    }
    if (this.node.parent.kind === ts.SyntaxKind.VariableDeclaration) {
      return true;
    }

    return false;
  }

  private getFunctionName() {
    if (this.node.kind === ts.SyntaxKind.FunctionDeclaration && (<ts.FunctionDeclaration>this.node).name) {
      return (<ts.FunctionDeclaration>this.node).name?.getText() ?? '';
    }

    switch (this.node.parent.kind) {
      case ts.SyntaxKind.VariableDeclaration:
      case ts.SyntaxKind.PropertyDeclaration:
        return this.getVariableName(<ts.VariableDeclaration>this.node.parent);
      case ts.SyntaxKind.BinaryExpression:
        return this.getPropertyName(<ts.BinaryExpression>this.node.parent);
      case ts.SyntaxKind.PropertyAssignment:
        return this.getPropertyAssignName(<ts.PropertyAssignment>this.node.parent);
    }

    return this.isFunction() ? 'Anonymous Function' : '';
  }

  private getVariableName(node: ts.VariableDeclaration) {
    return node.name.getText();
  }

  private getPropertyName(node: ts.BinaryExpression) {
    return node
      .getText()
      .split('=', 2)[0]
      .replace(/[\n|\r|\s|\t]+/, '');
  }

  private getPropertyAssignName(node: ts.PropertyAssignment) {
    return `${this.findPropertyAssignName(node).reverse().join('.')}()`;
  }

  private findPropertyAssignName(node: ts.PropertyAssignment): string[] {
    const result = [node.name.getText()];
    const parentNode = node.parent.parent;

    switch (parentNode.kind) {
      case ts.SyntaxKind.PropertyAssignment:
        return result.concat(this.findPropertyAssignName(<ts.PropertyAssignment>parentNode));
      case ts.SyntaxKind.BinaryExpression:
        return result.concat(
          this.getPropertyName(<ts.BinaryExpression>parentNode)
            .split('.')
            .reverse()
        );
      case ts.SyntaxKind.VariableDeclaration:
      case ts.SyntaxKind.PropertyDeclaration:
        return result.concat(this.getVariableName(<ts.VariableDeclaration>parentNode));
    }

    return result;
  }

  getChildren() {
    const result: ts.Node[] = [];
    ts.forEachChild(this.node, (row) => {
      result.push(row);
    });

    return result.map((row) => new ASTNode(row, this.sourceFile));
  }
}
