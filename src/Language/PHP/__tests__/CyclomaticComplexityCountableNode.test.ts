import { Engine } from 'php-parser';
import { readFileSync } from 'fs';
import { ASTNode } from '../ASTNode';
import { CyclomaticComplexityCountableNode } from '../CyclomaticComplexityCountableNode';

describe('CyclomaticComplexityCountableNode', () => {
  const engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true,
      withSource: true,
    },
  });
  const node = engine.parseCode(
    readFileSync(`${__dirname}/fixtures/example.php`).toString(),
    `${__dirname}/fixtures/example.php`
  );

  const [_, ...members] = new ASTNode(node.children[0], node).getChildren();

  const map = [...members].reduce(
    (map, node) => map.set((<any>node.node).name.name, node.getChildren()[1]),
    new Map<string, any>()
  );

  describe('.isIncrement()', () => {
    it.each([
      ['if', map.get('if')!.getChildren()[0]],
      ['switch', map.get('switch')!.getChildren()[0]],
      ['for', map.get('for')!.getChildren()[0]],
      ['while', map.get('while')!.getChildren()[0]],
      ['catch', map.get('try')!.getChildren()[0].getChildren().pop()],
      ['conditional', map.get('conditional')!.getChildren()[0].getChildren()[0]],
      ['ampersand', map.get('ampersand')!.getChildren()[0].getChildren()[0]],
      ['barbar', map.get('barbar')!.getChildren()[0].getChildren()[0]],
      ['label', map.get('label')!.getChildren()[1]],
      ['match', map.get('match')!.getChildren()[0].getChildren()[0].getChildren()[1]],
      ['nullishCoalescingOperator', map.get('nullishCoalescingOperator')!.getChildren()[0].getChildren()[0]],
      ['optionalChaining', map.get('optionalChaining')!.getChildren()[1].getChildren()[0]],
    ])('should %s is increment.', (_, astNode) => {
      const actual = new CyclomaticComplexityCountableNode(astNode);

      expect(actual.isIncrement()).toBe(true);
    });
  });
});
