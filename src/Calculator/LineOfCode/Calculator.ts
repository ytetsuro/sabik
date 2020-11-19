import { LineOfCodeCountableNode } from './Adapter/LineOfCodeCountableNode';
import { LineOfCode } from './LineOfCode';

export class Calculator {
  public calculate(node: LineOfCodeCountableNode) {
    const sourceText = node.getText();
    const removedUnnecessaryCodeSourceText = node.getRemovedCommentAndEmptyLineText();

    return new LineOfCode(
      this.getAllLine(sourceText),
      this.getAllLine(removedUnnecessaryCodeSourceText)
    );
  }

  private getAllLine(text: string) {
    return text.replace(/\r\n?$/g, '\n').split('\n').length;
  }
}
