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

  const [_, ...members] = (new ASTNode(node.children[0])).getChilds();

  const map = [...members].reduce(
    (map, node) => map.set((<any>node.node).name.name, node.getChilds()[1]),
    new Map<string, any>()
  );
  describe('.isNestLevelUp()', () => {
    it.each([
      ['if', map.get('if')!.getChilds()[0]],
      ['switch', map.get('switch')!.getChilds()[0]],
      ['for', map.get('for')!.getChilds()[0]],
      ['while', map.get('while')!.getChilds()[0]],
      ['catch', map.get('try')!.getChilds()[0].getChilds().pop()],
      ['do', map.get('do')!.getChilds()[0]],
      [
        'function',
        map.get('function')!.getChilds()[0].getChilds()[0],
      ],
      [
        'arrowFunction',
        map.get('arrowFunction')!.getChilds()[0].getChilds()[0],
      ],
    ])('should %s is nest level up.', (_, astNode) => {
      const actual = new ComplexityCountableNode(astNode);

      expect(actual.isNestLevelUp()).toBe(true);
    });

    it('should returns false when elseif or else statement.', () => {
      const elseIfActual = new ComplexityCountableNode(map.get('if')!.getChilds()[0].getChilds()[2]);
      const elseActual = new ComplexityCountableNode(map.get('if')!.getChilds()[0].getChilds()[2].getChilds()[2]);

      expect(elseIfActual.isNestLevelUp()).toBe(false);
      expect(elseActual.isNestLevelUp()).toBe(false);
    });
  });

  describe('.isNestingIncrement()', () => {
    it.each([
      ['if', map.get('if')!.getChilds()[0]],
      ['switch', map.get('switch')!.getChilds()[0]],
      ['for', map.get('for')!.getChilds()[0]],
      ['while', map.get('while')!.getChilds()[0]],
      ['catch', map.get('try')!.getChilds()[0].getChilds().pop()],
      ['conditional', map.get('conditional')!.getChilds()[0].getChilds()[0]],
    ])('should %s is nesting increment.', (_, astNode) => {
      const actual = new ComplexityCountableNode(astNode);

      expect(actual.isNestingIncrement()).toBe(true);
    });

    it('should returns false when elseif or else statement.', () => {
      const elseIfActual = new ComplexityCountableNode(map.get('if')!.getChilds()[0].getChilds()[2]);
      const elseActual = new ComplexityCountableNode(map.get('if')!.getChilds()[0].getChilds()[2].getChilds()[2]);

      expect(elseIfActual.isNestingIncrement()).toBe(false);
      expect(elseActual.isNestingIncrement()).toBe(false);
    });
  });

  describe('.isIncrement()', () => {
    it.each([
      ['if', map.get('if')!.getChilds()[0]],
      ['switch', map.get('switch')!.getChilds()[0]],
      ['for', map.get('for')!.getChilds()[0]],
      ['while', map.get('while')!.getChilds()[0]],
      ['catch', map.get('try')!.getChilds()[0].getChilds().pop()],
      ['conditional', map.get('conditional')!.getChilds()[0].getChilds()[0]],
      [
        'ampersand',
        map.get('ampersand')!.getChilds()[0].getChilds()[0],
      ],
      [
        'barbar',
        map.get('barbar')!.getChilds()[0].getChilds()[0],
      ],
      ['label', map.get('label')!.getChilds()[1]],
    ])('should %s is increment.', (_, astNode) => {
      const actual = new ComplexityCountableNode(astNode);

      expect(actual.isIncrement()).toBe(true);
    });

    it('should returns true when elseif or else statement.', () => {
      const elseIfActual = new ComplexityCountableNode(map.get('if')!.getChilds()[0].getChilds()[2]);
      const elseActual = new ComplexityCountableNode(map.get('if')!.getChilds()[0].getChilds()[2].getChilds()[2]);

      expect(elseIfActual.isIncrement()).toBe(true);
      expect(elseActual.isIncrement()).toBe(true);
    });
  });
});