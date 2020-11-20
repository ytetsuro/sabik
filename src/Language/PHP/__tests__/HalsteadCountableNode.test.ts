/*
import { readFileSync } from 'fs';
import ts from 'typescript';
import { ASTNode } from '../ASTNode';
import { HalsteadCountableNode } from '../HalsteadCountableNode';

describe('HalsteadCountableNode', () => {
  const parent = ts.createSourceFile(
    `${__dirname}/fixtures/example.ts`,
    readFileSync(`${__dirname}/fixtures/example.ts`).toString(),
    ts.ScriptTarget.ES2016,
    true
  );
  const variableStatement = <ts.VariableStatement>parent.statements[2];

  const findByText = (
    text: string,
    statement: ts.Node = variableStatement
  ): HalsteadCountableNode | null => {
    const node = statement.getChildren().find((row) => row.getText() === text);

    if (node) {
      return new HalsteadCountableNode(new ASTNode(node, parent));
    }

    return (
      statement
        .getChildren()
        .flatMap((row) => findByText(text, row))
        .find((row) => row) ?? null
    );
  };

  describe('.isOperand()', () => {
    it('should Math is operand.', () => {
      const actual = findByText('Math');

      expect(actual!.isOperand()).toBe(true);
    });

    it('should number literal is operand.', () => {
      const actual = findByText('3');

      expect(actual!.isOperand()).toBe(true);
    });

    it('should + is not operand.', () => {
      const actual = findByText('+');

      expect(actual!.isOperand()).toBe(false);
    });
  });

  describe('.isOperator()', () => {
    it('should Math is not operator.', () => {
      const actual = findByText('Math');

      expect(actual!.isOperator()).toBe(false);
    });

    it('should + is operator.', () => {
      const actual = findByText('+');

      expect(actual!.isOperator()).toBe(true);
    });
  });

  describe('.getText()', () => {
    it('should get operator text', () => {
      const actual = findByText('Math');

      expect(actual!.getText()).toBe('Math');
    });

    it('should get operand text', () => {
      const actual = findByText('+');

      expect(actual!.getText()).toBe('+');
    });
  });
});
*/