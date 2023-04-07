import { injectable } from 'inversify';
import { Engine } from 'php-parser';
import { LineOfCodeCountableNode as LineOfCodeCountableNodeInterface } from '../../Analyzer/CodeMetricsCalculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { type ASTNode } from './ASTNode';

@injectable()
export class LineOfCodeCountableNode implements LineOfCodeCountableNodeInterface {
  constructor(private readonly node: ASTNode) {}

  getText() {
    return this.node.source;
  }

  getRemovedCommentAndEmptyLineText() {
    const engine = new Engine({
      parser: {
        extractDoc: true,
      },
      lexer: {
        all_tokens: true,
      },
    });
    const source = this.node.commentStripSource.replace(/\r\n?/g, '\n');
    // https://github.com/glayzzle/php-parser/pull/737
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokens: Array<string | string[]> = <any>engine.tokenGetAll(`<?php ${source}`);

    const removeTargetLineNumbers = tokens
      .filter((row) => row[0] === 'T_WHITESPACE')
      .flatMap((row) =>
        [...Array((String(row[1]).match(/\n/g) ?? []).length).keys()]
          .map((index) => index + (Number(row[2]) - 1))
          .slice(1)
      );

    return removeTargetLineNumbers
      .reduce((sourcePerNewLine, removeIndexNumber) => {
        sourcePerNewLine[removeIndexNumber] = null;
        return sourcePerNewLine;
      }, <Array<string | null>>source.split('\n'))
      .filter((row) => row !== null)
      .join('\n');
  }
}
