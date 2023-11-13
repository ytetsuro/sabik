import ts from 'typescript';
import { ASTNode } from '../ASTNode';

describe('ASTNode', () => {
  describe('.isClass()', () => {
    it('should checkable class structure.', () => {
      const sourceFile = ts.createSourceFile('dummy.ts', 'class A {}; function a() {}', ts.ScriptTarget.ES2016, true);

      const classStructure = new ASTNode(sourceFile.statements[0], sourceFile);
      const notClassStructure = new ASTNode(sourceFile.statements[1], sourceFile);

      expect(classStructure.isClass()).toBe(true);
      expect(notClassStructure.isClass()).toBe(false);
    });
  });

  describe('.isFauxClass()', () => {
    it('should checkable FauxClass structure', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'function FauxClass() {return {hoge: () => {}}}; class A {}',
        ts.ScriptTarget.ES2016,
        true
      );

      const fauxClassStructure = new ASTNode(sourceFile.statements[0], sourceFile);
      const notFauxClassStructure = new ASTNode(sourceFile.statements[1], sourceFile);

      expect(fauxClassStructure.isFauxClass()).toBe(true);
      expect(notFauxClassStructure.isFauxClass()).toBe(false);
    });

    it('should returns false when arrow function.', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'const main = () => {return {hoge: () => {}}}; class A {}',
        ts.ScriptTarget.ES2016,
        true
      );

      const fauxClassStructure = new ASTNode(
        (<ts.VariableStatement>sourceFile.statements[0]).declarationList.declarations[0].initializer!,
        sourceFile
      );
      const notFauxClassStructure = new ASTNode(sourceFile.statements[1], sourceFile);

      expect(fauxClassStructure.isFauxClass()).toBe(false);
      expect(notFauxClassStructure.isFauxClass()).toBe(false);
    });
  });

  describe('.isFunction()', () => {
    it('should checkable function structure', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'function FauxClass() {return 1}; class A {}',
        ts.ScriptTarget.ES2016,
        true
      );

      const functionStructure = new ASTNode(sourceFile.statements[0], sourceFile);
      const notFunctionStructure = new ASTNode(sourceFile.statements[1], sourceFile);

      expect(functionStructure.isFunction()).toBe(true);
      expect(notFunctionStructure.isFunction()).toBe(false);
    });
  });

  describe('.isMethod()', () => {
    it('should checkable function structure', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'class A {constructor() {} methodA() {} get foo() {} set bar() {}}',
        ts.ScriptTarget.ES2016,
        true
      );

      const notMethodStructure = new ASTNode(sourceFile.statements[0], sourceFile);
      const constructorStructure = new ASTNode((<ts.ClassDeclaration>sourceFile.statements[0]).members[0], sourceFile);
      const methodStructure = new ASTNode((<ts.ClassDeclaration>sourceFile.statements[0]).members[1], sourceFile);
      const getAccessStructure = new ASTNode((<ts.ClassDeclaration>sourceFile.statements[0]).members[2], sourceFile);
      const setAccessStructure = new ASTNode((<ts.ClassDeclaration>sourceFile.statements[0]).members[3], sourceFile);

      expect(notMethodStructure.isMethod()).toBe(false);
      expect(constructorStructure.isMethod()).toBe(true);
      expect(methodStructure.isMethod()).toBe(true);
      expect(getAccessStructure.isMethod()).toBe(true);
      expect(setAccessStructure.isMethod()).toBe(true);
    });
  });

  describe('.getChildren()', () => {
    it('should get children ASTNode.', () => {
      const sourceFile = ts.createSourceFile(
        'dummy.ts',
        'class A {constructor() {} methodA() {}}',
        ts.ScriptTarget.ES2016,
        true
      );

      const classStructure = new ASTNode(sourceFile.statements[0], sourceFile);
      const actual = classStructure.getChildren();

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

      const constructorStructure = new ASTNode((<ts.ClassDeclaration>sourceFile.statements[0]).members[0], sourceFile);
      const methodStructure = new ASTNode((<ts.ClassDeclaration>sourceFile.statements[0]).members[1], sourceFile);

      expect(constructorStructure.getName()).toBe('constructor(arg)');
      expect(methodStructure.getName()).toBe('methodA(arg)');
    });

    it('should get function name.', () => {
      const sourceFile = ts.createSourceFile('dummy.ts', 'function a() {}', ts.ScriptTarget.ES2016, true);

      const functionStructure = new ASTNode(sourceFile.statements[0], sourceFile);

      expect(functionStructure.getName()).toBe('a');
    });

    it('should get variable name when anonymus function in variable.', () => {
      const sourceFile = ts.createSourceFile('dummy.ts', 'const a = () => {};', ts.ScriptTarget.ES2016, true);

      const functionStructure = new ASTNode(
        (<ts.VariableStatement>sourceFile.statements[0]).declarationList.declarations[0].initializer!,
        sourceFile
      );

      expect(functionStructure.getName()).toBe('a');
    });

    it('should get chaining variable name when anonymus function in object key.', () => {
      const sourceFile = ts.createSourceFile('dummy.ts', 'const a = {b: () => {}};', ts.ScriptTarget.ES2016, true);

      const functionStructure = new ASTNode(
        (<ts.PropertyAssignment>(
          (<ts.ObjectLiteralExpression>(
            (<ts.VariableStatement>sourceFile.statements[0]).declarationList.declarations[0].initializer!
          )).properties[0]
        )).initializer,
        sourceFile
      );

      expect(functionStructure.getName()).toBe('a.b()');
    });
  });
});
