import { ASTNode } from '../../Analyzer/Adapter/ASTNode';
import { File } from '../../Analyzer/Adapter/File';
import { LineOfCodeCountableNode } from './Adapter/LineOfCodeCountableNode';
import { LogicalLineOfCode } from './MetricsValue/LogicalLineOfCode';
import { PhysicalLineOfCode } from './MetricsValue/PhysicalLineOfCode';
import { MethodAnalyzer } from '../../Analyzer/ASTAnalyzer/MethodAnalyzer';
import { Metrics } from '../../Analyzer/Metrics/Metrics';
import { FileAnalyzer } from '../../Analyzer/ASTAnalyzer/FileAnalyzer';

type MetricsSource = {
  astNode: ASTNode;
  file: File;
};

type Analyzer<T> = MethodAnalyzer<T>|FileAnalyzer<T>;

export class Calculator {
  constructor(private readonly analyzers: Analyzer<LineOfCodeCountableNode>[]) {
  }

  analyze(astNodes: MetricsSource[]) {
    return this.analyzers.flatMap(analyzer => analyzer.analyze(astNodes))
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
