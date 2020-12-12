import { readFileSync } from 'fs';
import Engine from 'php-parser';
import { ASTNode } from '../ASTNode';
import { HalsteadCountableNode } from '../HalsteadCountableNode';

describe('HalsteadCountableNode', () => {
  const engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true,
      withSource: true,
    }
  });

  const parent = engine.parseCode(
    readFileSync(`${__dirname}/fixtures/example.php`).toString(),
  );

  const functionNode = new HalsteadCountableNode(new ASTNode(parent.children[2]));

  const findByText = (
    text: string,
  ): HalsteadCountableNode | null => {
    return functionNode.getChildren().find((row) => row.getText() === text) ?? null;
  };

  describe('.isOperand()', () => {
    it('should min is operand.', () => {
      const actual = findByText('min');

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
    it('should min is not operator.', () => {
      const actual = findByText('min');

      expect(actual!.isOperator()).toBe(false);
    });

    it('should + is operator.', () => {
      const actual = findByText('+');

      expect(actual!.isOperator()).toBe(true);
    });
  });

  describe('.getText()', () => {
    it('should get operator text', () => {
      const actual = findByText('min');

      expect(actual!.getText()).toBe('min');
    });

    it('should get operand text', () => {
      const actual = findByText('+');

      expect(actual!.getText()).toBe('+');
    });
  });
});