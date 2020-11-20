/*import { readFileSync } from 'fs';
import ts from 'typescript';
import { ASTNode } from '../ASTNode';
import { LineOfCodeCountableNode } from '../LineOfCodeContableNode';

describe('LineOfCodeCountableNode', () => {
  const parent = ts.createSourceFile(
    `${__dirname}/fixtures/example.ts`,
    readFileSync(`${__dirname}/fixtures/example.ts`).toString(),
    ts.ScriptTarget.ES2016,
    true
  );

  describe('getText()', () => {
    it('should get full text.', () => {
      const actual = new LineOfCodeCountableNode(new ASTNode(parent, parent));
      const expected = readFileSync(
        `${__dirname}/fixtures/example.ts`
      ).toString();

      expect(actual.getText()).toBe(expected);
    });
  });

  describe('getRemovedCommentAndEmptyLineText()', () => {
    it('should get strip empty line text.', () => {
      const actual = new LineOfCodeCountableNode(
        new ASTNode(parent.statements[1], parent)
      );

      expect(actual.getRemovedCommentAndEmptyLineText())
        .toBe(`const FauxClass = () => {
    return {
        method1: () => { },
        method2: () => { },
    };
};
`);
    });
  });
});
*/