import Engine from 'php-parser';
import { readFileSync } from 'fs';
import { ASTNode } from '../ASTNode';
import { ComplexityCountableNode } from '../ComplexityCountableNode';

describe('ComplexityCountableNode', () => {
  const engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true,
      withSource: true,
    }
  });
  const node = engine.parseCode(
    readFileSync(`${__dirname}/fixtures/example.php`).toString(),
    `${__dirname}/fixtures/example.php`
  );

  const [_, ...members] = (new ASTNode(node.children[0])).getChildren();

  const map = [...members].reduce(
    (map, node) => map.set((<any>node.node).name.name, node.getChildren()[1]),
    new Map<string, any>()
  );
  describe('.isNestLevelUp()', () => {
    it.each([
      ['if', map.get('if')!.getChildren()[0]],
      ['switch', map.get('switch')!.getChildren()[0]],
      ['for', map.get('for')!.getChildren()[0]],
      ['while', map.get('while')!.getChildren()[0]],
      ['catch', map.get('try')!.getChildren()[0].getChildren().pop()],
      ['do', map.get('do')!.getChildren()[0]],
      [
        'function',
        map.get('function')!.getChildren()[0].getChildren()[0],
      ],
      [
        'arrowFunction',
        map.get('arrowFunction')!.getChildren()[0].getChildren()[0],
      ],
    ])('should %s is nest level up.', (_, astNode) => {
      const actual = new ComplexityCountableNode(astNode);

      expect(actual.isNestLevelUp()).toBe(true);
    });

    it('should returns false when elseif or else statement.', () => {
      const elseIfActual = new ComplexityCountableNode(map.get('if')!.getChildren()[0].getChildren()[2]);
      const elseActual = new ComplexityCountableNode(map.get('if')!.getChildren()[0].getChildren()[2].getChildren()[2]);

      expect(elseIfActual.isNestLevelUp()).toBe(false);
      expect(elseActual.isNestLevelUp()).toBe(false);
    });
  });

  describe('.isNestingIncrement()', () => {
    it.each([
      ['if', map.get('if')!.getChildren()[0]],
      ['switch', map.get('switch')!.getChildren()[0]],
      ['for', map.get('for')!.getChildren()[0]],
      ['while', map.get('while')!.getChildren()[0]],
      ['catch', map.get('try')!.getChildren()[0].getChildren().pop()],
      ['conditional', map.get('conditional')!.getChildren()[0].getChildren()[0]],
    ])('should %s is nesting increment.', (_, astNode) => {
      const actual = new ComplexityCountableNode(astNode);

      expect(actual.isNestingIncrement()).toBe(true);
    });

    it('should returns false when elseif or else statement.', () => {
      const elseIfActual = new ComplexityCountableNode(map.get('if')!.getChildren()[0].getChildren()[2]);
      const elseActual = new ComplexityCountableNode(map.get('if')!.getChildren()[0].getChildren()[2].getChildren()[2]);

      expect(elseIfActual.isNestingIncrement()).toBe(false);
      expect(elseActual.isNestingIncrement()).toBe(false);
    });
  });

  describe('.isIncrement()', () => {
    it.each([
      ['if', map.get('if')!.getChildren()[0]],
      ['switch', map.get('switch')!.getChildren()[0]],
      ['for', map.get('for')!.getChildren()[0]],
      ['while', map.get('while')!.getChildren()[0]],
      ['catch', map.get('try')!.getChildren()[0].getChildren().pop()],
      ['conditional', map.get('conditional')!.getChildren()[0].getChildren()[0]],
      [
        'ampersand',
        map.get('ampersand')!.getChildren()[0].getChildren()[0],
      ],
      [
        'barbar',
        map.get('barbar')!.getChildren()[0].getChildren()[0],
      ],
      ['label', map.get('label')!.getChildren()[1]],
    ])('should %s is increment.', (_, astNode) => {
      const actual = new ComplexityCountableNode(astNode);

      expect(actual.isIncrement()).toBe(true);
    });

    it('should returns true when elseif or else statement.', () => {
      const elseIfActual = new ComplexityCountableNode(map.get('if')!.getChildren()[0].getChildren()[2]);
      const elseActual = new ComplexityCountableNode(map.get('if')!.getChildren()[0].getChildren()[2].getChildren()[2]);

      expect(elseIfActual.isIncrement()).toBe(true);
      expect(elseActual.isIncrement()).toBe(true);
    });
  });
});