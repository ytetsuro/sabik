import * as PHPParser from 'php-parser';
import { ComplexityCountableNode as ComplexityCountableNodeInterface } from '../../Calculator/CongnitiveComplexity/Adapter/ComplexityCountableNode';
import { ASTNode } from './ASTNode';

type BinNode = PHPParser.Node & {type: string};
type IfNode = PHPParser.Node & {alternate: PHPParser.Node};

export class ComplexityCountableNode
  implements ComplexityCountableNodeInterface {

  private static readonly nestLevelUpKinds = [
    'if',
    'catch',
    'switch',
    'for',
    'while',
    'do',
    'retif',
    'function',
    'closure',
    'arrowfunc',
  ];

  private static readonly nestingIncrementSyntaxKinds = [
    'if',
    'catch',
    'switch',
    'for',
    'while',
    'retif',
  ];

  private readonly node: ASTNode;

  constructor(node: ASTNode) {
    this.node = node;
  }

  isNestLevelUp() {
    return false;
  }

  isIncrement() {
    return false;
  }

  isNestingIncrement() {
    return false;
  }

  getChilds() {
    return this.node
      .getChilds()
      .map((node) => new ComplexityCountableNode(node));
  }
}
