/*
import { readFileSync } from 'fs';
import ts from 'typescript';
import { ASTNode } from '../ASTNode';
import { ComplexityCountableNode } from '../ComplexityCountableNode';

describe('ComplexityCountableNode', () => {
  const parent = ts.createSourceFile(
    `${__dirname}/fixtures/example.ts`,
    readFileSync(`${__dirname}/fixtures/example.ts`).toString(),
    ts.ScriptTarget.ES2016,
    true
  );
  const members = <ts.NodeArray<ts.MethodDeclaration>>(
    (<ts.ClassDeclaration>parent.statements[0]).members
  );
  const map = [...members].reduce(
    (map, node) => map.set(node.name.getText(), node.body!),
    new Map<string, ts.Block>()
  );

  describe('.isNestLevelUp()', () => {
    it.each([
      ['if', map.get('if')!.statements[0]],
      ['switch', map.get('switch')!.statements[0]],
      ['for', map.get('for')!.statements[0]],
      ['forIn', map.get('forIn')!.statements[0]],
      ['forOf', map.get('forOf')!.statements[0]],
      ['while', map.get('while')!.statements[0]],
      ['catch', (<ts.TryStatement>map.get('try')!.statements[0]).catchClause!],
      ['do', map.get('do')!.statements[0]],
      [
        'function',
        (<ts.ReturnStatement>map.get('function')!.statements[0]).expression!,
      ],
      [
        'arrowFunction',
        (<ts.ReturnStatement>map.get('arrowFunction')!.statements[0])
          .expression!,
      ],
    ])('should %s is nest level up.', (_, statement) => {
      const astNode = new ASTNode(statement, parent);
      const actual = new ComplexityCountableNode(astNode);

      expect(actual.isNestLevelUp()).toBe(true);
    });
  });

  describe('.isNestingIncrement()', () => {
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
    ])('should %s is nesting increment.', (_, statement) => {
      const astNode = new ASTNode(statement, parent);
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