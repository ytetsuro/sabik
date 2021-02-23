import { ASTNode } from '../../Analyzer/Adapter/ASTNode';
import { File } from '../../Analyzer/Adapter/File';
import { LineOfCodeCountableNode } from './Adapter/LineOfCodeCountableNode';
import { LogicalLineOfCode } from './MetricsValue/LogicalLineOfCode';
import { PhysicalLineOfCode } from './MetricsValue/PhysicalLineOfCode';

type MetricsSource = {
  astNode: ASTNode;
  file: File;
};

export class Calculator {
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
