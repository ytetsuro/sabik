import { ComplexityCountableNode } from './Adapter/ComplexityCountableNode';
import { ComplexityIncrement } from './ComplexityIncrement';
import { CognitiveComplexity } from './CognitiveComplexity';
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

  calculate(node: ComplexityCountableNode): CognitiveComplexity[] {
    const complexities = this.extractComplexity(node, 0);

    return [new CognitiveComplexity(complexities)];
  }

  private extractComplexity(node: ComplexityCountableNode, nest: number): ComplexityIncrement[] {
    const result: ComplexityIncrement[] = [];

    if (node.isIncrement()) {
      result.push(new ComplexityIncrement(node, nest));
    }

    if (node.isNestLevelUp()) {
      const incrementedNest = nest + 1;
      return result.concat(
        ...node
          .getChildren()
          .map((row) => this.extractComplexity(row, incrementedNest))
          .filter((row) => row.length > 0)
      );
    }

    return result.concat(...node.getChildren().map((row) => this.extractComplexity(row, nest)));
  }
}
