import {Engine, Node } from 'php-parser';
import { ASTNode } from '../ASTNode';

type Assign = Node & { right: Node; left: Node };
type ExpressionStatement = Node & { expression: Assign };
type ClassStatement = Node & { body: Node[] };

describe('ASTNode', () => {
  const engine = new Engine({
    parser: {
      extractDoc: true,
    },
    ast: {
      withPositions: true,
      withSource: true,
    },
    lexer: {
      all_tokens: true,
    },
  });
  describe('.isClass()', () => {
    it('should checkable class structure.', () => {
      const sourceFile = engine.parseCode('<?php class A {}; function a() {}', '');
      const classStructure = new ASTNode(sourceFile.children[0], sourceFile);
      const notClassStructure = new ASTNode(sourceFile.children[1], sourceFile);

      expect(classStructure.isClass()).toBe(true);
      expect(notClassStructure.isClass()).toBe(false);
    });

    it('should returns true when trait.', () => {
      const sourceFile = engine.parseEval('trait A {}');

      const fauxClassStructure = new ASTNode(
        sourceFile.children[0],
        sourceFile
      );

      expect(fauxClassStructure.isClass()).toBe(true);
    });
  });

  describe('.isFauxClass()', () => {
    it('should returns false.', () => {
      const sourceFile = engine.parseEval(
        'trait A {}; class B{}; function a() {}'
      );

      const traitStructure = new ASTNode(sourceFile.children[0], sourceFile);
      const classStructure = new ASTNode(sourceFile.children[1], sourceFile);
      const functionStructure = new ASTNode(sourceFile.children[2], sourceFile);

      expect(traitStructure.isFauxClass()).toBe(false);
      expect(classStructure.isFauxClass()).toBe(false);
      expect(functionStructure.isFauxClass()).toBe(false);
    });
  });

  describe('.isFunction()', () => {
    it('should checkable function structure', () => {
      const sourceFile = engine.parseEval('trait A {}; function a() {}');

      const functionStructure = new ASTNode(sourceFile.children[1], sourceFile);
      const notFunctionStructure = new ASTNode(
        sourceFile.children[0],
        sourceFile
      );

      expect(functionStructure.isFunction()).toBe(true);
      expect(notFunctionStructure.isFunction()).toBe(false);
    });

    it('should returns true when arrow functions.', () => {
      const sourceFile = engine.parseEval('$a = fn() => 1;');

      const functionStructure = new ASTNode(
        (<ExpressionStatement>sourceFile.children[0]).expression.right,
        sourceFile
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
        sourceFile.children[0],
        sourceFile
      );
      const constructorStructure = new ASTNode(
        (<ClassStatement>sourceFile.children[0]).body[0],
        sourceFile
      );
      const methodStructure = new ASTNode(
        (<ClassStatement>sourceFile.children[0]).body[1],
        sourceFile
      );

      expect(notMethodStructure.isMethod()).toBe(false);
      expect(constructorStructure.isMethod()).toBe(true);
      expect(methodStructure.isMethod()).toBe(true);
    });
  });

  describe('.getChildren()', () => {
    it('should get children ASTNode.', () => {
      const sourceFile = engine.parseEval(`
      class A {
        function __construct() {}
        function methodA() {}
      }`);

      const classStructure = new ASTNode(sourceFile.children[0], sourceFile);
      const actual = classStructure.getChildren();

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

      const classStructure = new ASTNode(sourceFile.children[0], sourceFile);

      expect(classStructure.getName()).toBe('A');
    });

    it('should get method name.', () => {
      const sourceFile = engine.parseEval(`
      class A {
        function __construct(string $arg) {}
        function methodA(array $args) {}
      }`);

      const constructorStructure = new ASTNode(
        (<ClassStatement>sourceFile.children[0]).body[0],
        sourceFile
      );
      const methodStructure = new ASTNode(
        (<ClassStatement>sourceFile.children[0]).body[1],
        sourceFile
      );

      expect(constructorStructure.getName()).toBe('__construct($arg)');
      expect(methodStructure.getName()).toBe('methodA($args)');
    });

    it('should get function name.', () => {
      const sourceFile = engine.parseEval(`
        function a() {}
      `);

      const functionStructure = new ASTNode(sourceFile.children[0], sourceFile);

      expect(functionStructure.getName()).toBe('a');
    });

    it('should get variable name when anonymus function in variable.', () => {
      const sourceFile = engine.parseEval(`
        $a = function () {};
      `);

      const functionStructure = new ASTNode(sourceFile, sourceFile)
        .getChildren()[0]
        .getChildren()[0]
        .getChildren()[1];

      expect(functionStructure.getName()).toBe('$a');
    });

    it('should get chaining variable name when anonymus function in array key.', () => {
      const sourceFile = engine.parseEval(`
        $a = ['b' => fn() => 1];
      `);

      const functionStructure = new ASTNode(sourceFile, sourceFile)
        .getChildren()[0]
        .getChildren()[0]
        .getChildren()[1]
        .getChildren()[0]
        .getChildren()[1];

      expect(functionStructure.getName()).toBe('$a.b');
    });

    it('should get chaining property name when anonymus function', () => {
      const sourceFile = engine.parseEval(`
        $a->c
          ->d
          ::$c = fn() => 1;
      `);

      const functionStructure = new ASTNode(sourceFile, sourceFile)
        .getChildren()[0]
        .getChildren()[0]
        .getChildren()[1];

      expect(functionStructure.getName()).toBe('$a.c.d.$c');
    });
  });

  describe('.source', () => {
    const sourceFile = engine.parseEval(`
      /**
       * Class Comment.
       **/
      class A {
        /**
         * MultiLine Comment.
         **/
        function hasCommentMethod() {
          // inline comment.
          return 1;
          // this is end comment.
        }

        function hasNotCommentMethod() {
          return 2;
        }
      }`);

    it('should returns has comment method source code.', () => {
      const methodStructure = new ASTNode(sourceFile, sourceFile)
        .getChildren()[0]
        .getChildren()[2];

      expect(methodStructure.source).toBe(`/**
         * MultiLine Comment.
         **/
        function hasCommentMethod() {
          // inline comment.
          return 1;
          // this is end comment.
        }`);
    });

    it('should returns has not comment method source code.', () => {
      const methodStructure = new ASTNode(sourceFile, sourceFile)
        .getChildren()[0]
        .getChildren()[3];

      expect(methodStructure.source).toBe(`function hasNotCommentMethod() {
          return 2;
        }`);
    });

    it('should return all source code.', () => {
      const structure = new ASTNode(sourceFile, sourceFile);

      expect(structure.source).toBe(`
      /**
       * Class Comment.
       **/
      class A {
        /**
         * MultiLine Comment.
         **/
        function hasCommentMethod() {
          // inline comment.
          return 1;
          // this is end comment.
        }

        function hasNotCommentMethod() {
          return 2;
        }
      }`);
    });
  });

  describe('.commentStripSource', () => {
    const sourceFile = engine.parseEval(`
      /**
       * Class Comment.
       **/
      class A {
        /**
         * MultiLine Comment.
         **/
        function hasCommentMethod() {
          // inline comment.
          return 1;
          // this is end comment.
        }

        function hasNotCommentMethod() {
          $hearDocument = <<<EOT
          /** this is Not Comment **/
          EOT;

          return $hearDocument;
        }
      }`);

    it('should returns striped comment method source code.', () => {
      const methodStructure = new ASTNode(sourceFile, sourceFile)
        .getChildren()[0]
        .getChildren()[2];

      expect(methodStructure.commentStripSource).toBe(`
        function hasCommentMethod() {
                    return 1;
                  }`);
    });

    it('should return striped comment all source code.', () => {
      const structure = new ASTNode(sourceFile, sourceFile);

      expect(structure.commentStripSource).toBe(`
      
      class A {
        
        function hasCommentMethod() {
                    return 1;
                  }

        function hasNotCommentMethod() {
          $hearDocument = <<<EOT
          /** this is Not Comment **/
          EOT;

          return $hearDocument;
        }
      }`);
    });
  });
});
