import Engine, {Node} from 'php-parser';
import { ASTNode } from '../ASTNode';

type Assign = Node & {right: Node, left: Node};
type ExpressionStatement = Node & {expression: Assign};

describe('ASTNode', () => {
  const engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true
    }
  });
  describe('.isClass()', () => {
    it('should checkable class structure.', () => {
      const sourceFile = engine.parseEval('class A {}; function a() {}');
      const classStructure = new ASTNode(sourceFile.children[0]);
      const notClassStructure = new ASTNode(sourceFile.children[1]);

      expect(classStructure.isClass()).toBe(true);
      expect(notClassStructure.isClass()).toBe(false);
    });
  });

  describe('.isFauxFunction()', () => {
    it('should checkable FauxClass structure', () => {
      const sourceFile = engine.parseEval('trait A {}; function a() {}');

      const fauxClassStructure = new ASTNode(
        sourceFile.children[0],
      );
      const notFauxClassStructure = new ASTNode(
        sourceFile.children[1],
      );

      expect(fauxClassStructure.isFauxClass()).toBe(true);
      expect(notFauxClassStructure.isFauxClass()).toBe(false);
    });
  });

  describe('.isFunction()', () => {
    it('should checkable function structure', () => {
      const sourceFile = engine.parseEval('trait A {}; function a() {}');

      const functionStructure = new ASTNode(
        sourceFile.children[1],
      );
      const notFunctionStructure = new ASTNode(
        sourceFile.children[0],
      );

      expect(functionStructure.isFunction()).toBe(true);
      expect(notFunctionStructure.isFunction()).toBe(false);
    });

    it('should returns true when arrow functions.', () => {
      const sourceFile = engine.parseEval('$a = fn() => 1;');

      const functionStructure = new ASTNode(
        (<ExpressionStatement>sourceFile.children[0]).expression.right,
      );

      expect(functionStructure.isFunction()).toBe(true);
    });
  });

/*
  describe('.isMethod()', () => {
    it('should checkable function structure', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'class A {constructor() {} methodA() {}}',
        ts.ScriptTarget.ES2016,
        true
      );

      const notMethodStructure = new ASTNode(
        sourceFile.statements[0],
        sourceFile
      );
      const constructorStructure = new ASTNode(
        (<ts.ClassDeclaration>sourceFile.statements[0]).members[0],
        sourceFile
      );
      const methodStructure = new ASTNode(
        (<ts.ClassDeclaration>sourceFile.statements[0]).members[1],
        sourceFile
      );

      expect(notMethodStructure.isMethod()).toBe(false);
      expect(constructorStructure.isMethod()).toBe(true);
      expect(methodStructure.isMethod()).toBe(true);
    });
  });

  describe('.getChilds()', () => {
    it('should get children ASTNode.', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'class A {constructor() {} methodA() {}}',
        ts.ScriptTarget.ES2016,
        true
      );

      const classStructure = new ASTNode(sourceFile.statements[0], sourceFile);
      const actual = classStructure.getChilds();

      expect(actual.length).toBe(3);
      expect(actual[1]).toBeInstanceOf(ASTNode);
      expect(actual[1].getName()).toBe('constructor()');
    });
  });

  describe('.getName()', () => {
    it('should get class name.', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'class A {constructor() {} methodA() {}}',
        ts.ScriptTarget.ES2016,
        true
      );

      const classStructure = new ASTNode(sourceFile.statements[0], sourceFile);

      expect(classStructure.getName()).toBe('A');
    });

    it('should get method name.', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'class A {constructor(arg:number) {} methodA(arg:string) {}}',
        ts.ScriptTarget.ES2016,
        true
      );

      const constructorStructure = new ASTNode(
        (<ts.ClassDeclaration>sourceFile.statements[0]).members[0],
        sourceFile
      );
      const methodStructure = new ASTNode(
        (<ts.ClassDeclaration>sourceFile.statements[0]).members[1],
        sourceFile
      );

      expect(constructorStructure.getName()).toBe('constructor(arg)');
      expect(methodStructure.getName()).toBe('methodA(arg)');
    });

    it('should get function name.', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'function a() {}',
        ts.ScriptTarget.ES2016,
        true
      );

      const functionStructure = new ASTNode(
        sourceFile.statements[0],
        sourceFile
      );

      expect(functionStructure.getName()).toBe('a');
    });

    it('should get variable name when anonymus function in variable.', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'const a = () => {};',
        ts.ScriptTarget.ES2016,
        true
      );

      const functionStructure = new ASTNode(
        (<ts.VariableStatement>(
          sourceFile.statements[0]
        )).declarationList.declarations[0].initializer!,
        sourceFile
      );

      expect(functionStructure.getName()).toBe('a');
    });

    it('should get chaining variable name when anonymus function in object key.', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'const a = {b: () => {}};',
        ts.ScriptTarget.ES2016,
        true
      );

      const functionStructure = new ASTNode(
        (<ts.PropertyAssignment>(
          (<ts.ObjectLiteralExpression>(
            (<ts.VariableStatement>sourceFile.statements[0]).declarationList
              .declarations[0].initializer!
          )).properties[0]
        )).initializer,
        sourceFile
      );

      expect(functionStructure.getName()).toBe('a.b()');
    });
  });*/
});
