import { ComplexityCountableNode } from './Adapter/ComplexityCountableNode';
import { ComplexityIncrement } from './ComplexityIncrement';
import { CyclomaticComplexity } from './CyclomaticComplexity';
import { CalculatorForAST } from '../../FromASTNode/CalculatorForAST';
import { MethodAnalyzer } from '../../FromASTNode/MethodAnalyzer';
import { Metrics } from '../../Metrics/Metrics';
import { ASTNodeSource } from '../../FromASTNode/ASTNodeSource';
import { inject, injectable } from 'inversify';
import { Types } from '../../../types/Types';
import { Converter } from '../../Adapter/Converter';

@injectable()
export class Calculator implements CalculatorForAST {
  constructor(
    @inject(MethodAnalyzer) private readonly analyzer: MethodAnalyzer,
    @inject(Types.cognitiveComplexityConverter)
    private readonly converter: Converter<ComplexityCountableNode>
  ) {}

  analyze(astNodes: ASTNodeSource[]) {
    return this.analyzer
      .analyze(astNodes)
      .map(({ astNode, ...other }) => ({
        ...other,
        countableNode: this.converter.convert(astNode),
      }))
      .map((row) => new Metrics(row.file, row.codePoints, this.calculate(row.countableNode)));
  }

  calculate(node: ComplexityCountableNode): CyclomaticComplexity[] {
    const complexities = this.extractComplexity(node);

    return [new CyclomaticComplexity(complexities)];
  }

  private extractComplexity(node: ComplexityCountableNode): ComplexityIncrement[] {
    const result: ComplexityIncrement[] = [];

    if (node.isIncrement()) {
      result.push(new ComplexityIncrement(node));
    }

    return result.concat(...node.getChildren().map((row) => this.extractComplexity(row)));
  }
}
