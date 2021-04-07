import { ComplexityCountableNode } from './Adapter/ComplexityCountableNode';
import { ComplexityIncrement } from './ComplexityIncrement';
import { CognitiveComplexity } from './CognitiveComplexity';
import { ASTAnalyzer } from '../../Analyzer/ASTAnalyzer/ASTAnalyzer';
import { MethodAnalyzer } from '../../Analyzer/ASTAnalyzer/MethodAnalyzer';
import { ASTNode } from '../../Analyzer/Adapter/ASTNode';
import { File } from '../../Analyzer/Adapter/File';
import { Metrics } from '../../Analyzer/Metrics/Metrics';

type ASTNodeSource = {
  astNode: ASTNode;
  file: File;
};

export class Calculator implements ASTAnalyzer {
  constructor(private readonly analyzer: MethodAnalyzer<ComplexityCountableNode>) {
  }

  analyze(astNodes: ASTNodeSource[]) {
    return this.analyzer.analyze(astNodes)
      .map(row => new Metrics(row.file, row.codePoints, this.calculate(row.countableNode)));
  }  

  calculate(node: ComplexityCountableNode): CognitiveComplexity[] {
    const complexities = this.extractComplexity(node, 0);

    return [new CognitiveComplexity(complexities)];
  }

  private extractComplexity(
    node: ComplexityCountableNode,
    nest: number
  ): ComplexityIncrement[] {
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

    return result.concat(
      ...node.getChildren().map((row) => this.extractComplexity(row, nest))
    );
  }
}
