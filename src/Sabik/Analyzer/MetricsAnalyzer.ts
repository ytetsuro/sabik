import { Converter } from '../../Analyzer/Adapter/Converter';
import { ASTNode } from '../../Analyzer/Adapter/ASTNode';
import { ComplexityStore } from '../../Calculator/CongnitiveComplexity/ComplexityStore';
import { ComplexityCountableNode } from '../../Calculator/CongnitiveComplexity/Adapter/ComplexityCountableNode';
import { Halstead } from '../../Calculator/Halstead/Halstead';
import { LineOfCodeCountableNode } from '../../Calculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { Analyzer as ASTAnalyzer } from '../../Analyzer/SourceFile/Analyzer';
import { HalsteadCountableNode } from '../../Calculator/Halstead/Adapter/HalsteadCountableNode';
import { LineOfCode } from '../../Calculator/LineOfCode/LineOfCode';
import { Calculator as ComplexityCalculator } from '../../Calculator/CongnitiveComplexity/Calculator';
import { Calculator as HalsteadCalculator } from '../../Calculator/Halstead/Calculator';
import { Calculator as LineOfCodeCalculator } from '../../Calculator/LineOfCode/Calculator';
import { Calculator } from '../../Calculator/Maintainability/Calculator';
import { Metrics } from './Metrics';

export class MetricsAnalyzer {
  private complexityAnalyzer: ASTAnalyzer<
    ComplexityCountableNode,
    ComplexityStore
  >;

  private halsteadAnalayzer: ASTAnalyzer<HalsteadCountableNode, Halstead>;

  private lineOfCodeAnalayzer: ASTAnalyzer<LineOfCodeCountableNode, LineOfCode>;

  private maintainabilityCalculator: Calculator = new Calculator();

  constructor(
    complexityConverter: Converter<ComplexityCountableNode>,
    halstedConverter: Converter<HalsteadCountableNode>,
    lineOfCodeConverter: Converter<LineOfCodeCountableNode>
  ) {
    this.complexityAnalyzer = new ASTAnalyzer(
      new ComplexityCalculator(),
      complexityConverter
    );
    this.halsteadAnalayzer = new ASTAnalyzer(
      new HalsteadCalculator(),
      halstedConverter
    );
    this.lineOfCodeAnalayzer = new ASTAnalyzer(
      new LineOfCodeCalculator(),
      lineOfCodeConverter
    );
  }

  analyze(astNode: ASTNode): Metrics {
    const congnitiveComplexity = this.complexityAnalyzer.analyze(astNode);
    const halstead = this.halsteadAnalayzer.analyze(astNode);
    const lineOfCode = this.lineOfCodeAnalayzer.analyze(astNode);
    const maintainability = this.maintainabilityCalculator.calculate({
      complexity: congnitiveComplexity,
      halstead,
      lineOfCode,
    });

    return {
      congnitiveComplexity,
      halstead,
      lineOfCode,
      maintainability,
    };
  }
}
