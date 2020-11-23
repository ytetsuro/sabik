import Engine, {Node} from 'php-parser';
import { ASTNode } from '../ASTNode';

type Assign = Node & {right: Node, left: Node};
type ExpressionStatement = Node & {expression: Assign};
type ClassStatement = Node & {body: Node[]};

describe('ASTNode', () => {
  const engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true,
      withSource: true,
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

    it('should returns true when trait.', () => {
      const sourceFile = engine.parseEval('trait A {}');

      const fauxClassStructure = new ASTNode(
        sourceFile.children[0],
      );

      expect(fauxClassStructure.isClass()).toBe(true);
    })
  });

  describe('.isFauxClass()', () => {
    it('should returns false.', () => {
      const sourceFile = engine.parseEval('trait A {}; class B{}; function a() {}');

      const traitStructure = new ASTNode(
        sourceFile.children[0],
      );
      const classStructure = new ASTNode(
        sourceFile.children[1],
      );
      const functionStructure = new ASTNode(
        sourceFile.children[2],
      );

      expect(traitStructure.isFauxClass()).toBe(false);
      expect(classStructure.isFauxClass()).toBe(false);
      expect(functionStructure.isFauxClass()).toBe(false);
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

  describe('.isMethod()', () => {
    it('should checkable method structure', () => {
      const sourceFile = engine.parseEval(`
      class A {
        function __construct() {}
        function methodA() {}
      }`);

      const notMethodStructure = new ASTNode(
        sourceFile.children[0]
      );
      const constructorStructure = new ASTNode(
        (<ClassStatement>sourceFile.children[0]).body[0]
      );
      const methodStructure = new ASTNode(
        (<ClassStatement>sourceFile.children[0]).body[1]
      );

      expect(notMethodStructure.isMethod()).toBe(false);
      expect(constructorStructure.isMethod()).toBe(true);
      expect(methodStructure.isMethod()).toBe(true);
    });
  });

  describe('.getChilds()', () => {
    it('should get children ASTNode.', () => {
      const sourceFile = engine.parseEval(`
      class A {
        function __construct() {}
        function methodA() {}
      }`);

      const classStructure = new ASTNode(sourceFile.children[0]);
      const actual = classStructure.getChilds();

      expect(actual.length).toBe(3);
      expect(actual[1]).toBeInstanceOf(ASTNode);
    });
  });

  describe('.getName()', () => {
    it('should get class name.', () => {
      const sourceFile = engine.parseEval(`
      class A {
        function __construct() {}
        function methodA() {}
      }`);

      const classStructure = new ASTNode(sourceFile.children[0]);

      expect(classStructure.getName()).toBe('A');
    });

    it('should get method name.', () => {
      const sourceFile = engine.parseEval(`
      class A {
        function __construct(string $arg) {}
        function methodA(array $args) {}
      }`);

      const constructorStructure = new ASTNode(
        (<ClassStatement>sourceFile.children[0]).body[0]
      );
      const methodStructure = new ASTNode(
        (<ClassStatement>sourceFile.children[0]).body[1]
      );

      expect(constructorStructure.getName()).toBe('__construct($arg)');
      expect(methodStructure.getName()).toBe('methodA($args)');
    });

    it('should get function name.', () => {
      const sourceFile = engine.parseEval(`
        function a() {}
      `);

      const functionStructure = new ASTNode(
        sourceFile.children[0],
      );

      expect(functionStructure.getName()).toBe('a');
    });

    it('should get variable name when anonymus function in variable.', () => {
      const sourceFile = engine.parseEval(`
        $a = function () {};
      `);

      const functionStructure = (new ASTNode(sourceFile)).getChilds()[0].getChilds()[0].getChilds()[1];

      expect(functionStructure.getName()).toBe('$a');
    });

    it('should get chaining variable name when anonymus function in array key.', () => {
      const sourceFile = engine.parseEval(`
        $a = ['b' => fn() => 1];
      `);

      const functionStructure = (new ASTNode(sourceFile))
        .getChilds()[0]
        .getChilds()[0]
        .getChilds()[1]
        .getChilds()[0]
        .getChilds()[1];

      expect(functionStructure.getName()).toBe('$a.b');
    });

    it('should get chaining property name when anonymus function', () => {
      const sourceFile = engine.parseEval(`
        $a->c
          ->d
          ::$c = fn() => 1;
      `);

      const functionStructure = (new ASTNode(sourceFile))
        .getChilds()[0]
        .getChilds()[0]
        .getChilds()[1];

      expect(functionStructure.getName()).toBe('$a.c.d.$c');
    });
  });
});
