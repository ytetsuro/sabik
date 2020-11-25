import { Converter } from '../../Analyzer/Adapter/Converter';
import { ASTNode } from '../../Analyzer/Adapter/ASTNode';
import { ComplexityStore } from '../../Calculator/CognitiveComplexity/ComplexityStore';
import { ComplexityCountableNode } from '../../Calculator/CognitiveComplexity/Adapter/ComplexityCountableNode';
import { Halstead } from '../../Calculator/Halstead/Halstead';
import { LineOfCodeCountableNode } from '../../Calculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { Analyzer as ASTAnalyzer } from '../../Analyzer/SourceFile/Analyzer';
import { HalsteadCountableNode } from '../../Calculator/Halstead/Adapter/HalsteadCountableNode';
import { LineOfCode } from '../../Calculator/LineOfCode/LineOfCode';
import { Calculator as ComplexityCalculator } from '../../Calculator/CognitiveComplexity/Calculator';
import { Calculator as HalsteadCalculator } from '../../Calculator/Halstead/Calculator';
import { Calculator as LineOfCodeCalculator } from '../../Calculator/LineOfCode/Calculator';
import { Calculator } from '../../Calculator/Maintainability/Calculator';
import { Metrics } from './Metrics';

export class MetricsAnalyzer {
  private complexityAnalyzer: ASTAnalyzer<
    ComplexityCountableNode,
    ComplexityStore
  >;

  private halsteadAnalyzer: ASTAnalyzer<HalsteadCountableNode, Halstead>;

  private lineOfCodeAnalyzer: ASTAnalyzer<LineOfCodeCountableNode, LineOfCode>;

  private maintainabilityCalculator: Calculator = new Calculator();

  constructor(
    complexityConverter: Converter<ComplexityCountableNode>,
    halsteadConverter: Converter<HalsteadCountableNode>,
    lineOfCodeConverter: Converter<LineOfCodeCountableNode>
  ) {
    this.complexityAnalyzer = new ASTAnalyzer(
      new ComplexityCalculator(),
      complexityConverter
    );
    this.halsteadAnalyzer = new ASTAnalyzer(
      new HalsteadCalculator(),
      halsteadConverter
    );
    this.lineOfCodeAnalyzer = new ASTAnalyzer(
      new LineOfCodeCalculator(),
      lineOfCodeConverter
    );
  }

  analyze(astNode: ASTNode): Metrics {
    const cognitiveComplexity = this.complexityAnalyzer.analyze(astNode);
    const halstead = this.halsteadAnalyzer.analyze(astNode);
    const lineOfCode = this.lineOfCodeAnalyzer.analyze(astNode);
    const maintainability = this.maintainabilityCalculator.calculate({
      complexity: cognitiveComplexity,
      halstead,
      lineOfCode,
    });

    return {
      cognitiveComplexity: cognitiveComplexity,
      halstead,
      lineOfCode,
      maintainability,
    };
  }
}
