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
  });

  describe('.isIncrement()', () => {
    it.each([
      ['if', map.get('if')!.statements[0]],
      ['switch', map.get('switch')!.statements[0]],
      ['for', map.get('for')!.statements[0]],
      ['forIn', map.get('forIn')!.statements[0]],
      ['forOf', map.get('forOf')!.statements[0]],
      ['while', map.get('while')!.statements[0]],
      ['catch', (<ts.TryStatement>map.get('try')!.statements[0]).catchClause!],
      [
        'conditional',
        (<ts.ReturnStatement>map.get('conditional')!.statements[0]).expression!,
      ],
      [
        'ampersand',
        (<ts.BinaryExpression>(
          (<ts.ReturnStatement>map.get('ampersand')!.statements[0]).expression!
        )).operatorToken,
      ],
      [
        'barbar',
        (<ts.BinaryExpression>(
          (<ts.ReturnStatement>map.get('barbar')!.statements[0]).expression!
        )).operatorToken,
      ],
      ['label', map.get('label')!.statements[0]],
    ])('should %s is increment.', (_, statement) => {
      const astNode = new ASTNode(statement, parent);
      const actual = new ComplexityCountableNode(astNode);

      expect(actual.isIncrement()).toBe(true);
    });
  });
});
*/