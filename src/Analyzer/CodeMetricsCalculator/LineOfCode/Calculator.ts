import { LineOfCodeCountableNode } from './Adapter/LineOfCodeCountableNode';
import { LogicalLineOfCode } from './MetricsValue/LogicalLineOfCode';
import { PhysicalLineOfCode } from './MetricsValue/PhysicalLineOfCode';
import { Metrics } from '../../Metrics/Metrics';
import { ASTNodeSource } from '../../FromASTNode/ASTNodeSource';
import { inject, injectable, multiInject } from 'inversify';
import { Types } from '../../../types/Types';
import { Analyzer } from '../../FromASTNode/Analyzer';
import { Converter } from '../../Adapter/Converter';

@injectable()
export class Calculator {
  constructor(
    @multiInject(Types.analyzer) private readonly analyzers: Analyzer[],
    @inject(Types.lineOfCodeConverter) private readonly converter: Converter<LineOfCodeCountableNode>
  ) {}

  analyze(astNodes: ASTNodeSource[]): Metrics[] {
    return this.analyzers.flatMap(analyzer => analyzer.analyze(astNodes))
      .map((row) => ({...row, countableNode: this.converter.convert(row.astNode)}))
      .map(row => new Metrics(row.file, row.codePoints, this.calculate(row.countableNode)));
  }

  public calculate(node: LineOfCodeCountableNode) {
    const sourceText = node.getText();
    const removedUnnecessaryCodeSourceText = node.getRemovedCommentAndEmptyLineText();

    return [
      new LogicalLineOfCode(this.getAllLine(removedUnnecessaryCodeSourceText)),
      new PhysicalLineOfCode(this.getAllLine(sourceText)),
    ];
  }

  private getAllLine(text: string) {
    return text.replace(/\r\n?$/g, '\n').split('\n').length;
  }
}
