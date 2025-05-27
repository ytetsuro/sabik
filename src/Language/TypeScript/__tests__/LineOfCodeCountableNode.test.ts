import * as ts from 'typescript';
import { ASTGenerator as TypeScriptASTGenerator } from '../ASTGenerator';
import { ASTNode as TypeScriptASTNodeWrapper } from '../ASTNode';
import { LineOfCodeCountableNode as TypeScriptLineOfCodeCountableNode } from '../LineOfCodeCountableNode';

describe('TypeScriptLineOfCodeCountableNode', () => {
  const предме计数器 = (code: string, fileName: string = 'test.ts'): number => {
    const sourceFile = ts.createSourceFile(
      fileName,
      code,
      ts.ScriptTarget.ESNext,
      true // setParentNodes
    );

    // The LineOfCodeCountableNode constructor expects our wrapper ASTNode.
    const wrapperNode = new TypeScriptASTNodeWrapper(sourceFile, sourceFile);
    const countableNode = new TypeScriptLineOfCodeCountableNode(wrapperNode);

    return countableNode.countStatements();
  };

  it('should count a simple variable declaration', () => {
    const code = 'let a = 1;';
    expect(предме计数器(code)).toBe(1);
  });

  it('should count basic if and return statements', () => {
    const code = `
      if (true) {
          return 1;
      }`;
    // IfStatement (1) + ReturnStatement (1) = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should count a for loop correctly (initializer, condition, incrementor, body statement)', () => {
    const code = `
      for (let i = 0; i < 1; i++) {
        console.log(i);
      }
    `;
    // ForStatement parts: VariableStatement (let i = 0) (1) + Condition (i < 1) (1) + Incrementor (i++) (1)
    // Body: ExpressionStatement (console.log(i)) (1)
    // Total = 4
    expect(предме计数器(code)).toBe(4);
  });

  it('should count an empty block statement', () => {
    const code = '{}';
    // EmptyStatement or Block (1)
    expect(предме计数器(code)).toBe(1);
  });

  it('should count function and class declarations', () => {
    const code = `
      function foo() {}
      class Bar {}
    `;
    // FunctionDeclaration (1) + ClassDeclaration (1) = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should count interface and type alias declarations', () => {
    const code = `
      interface Foo {}
      type Bar = number;
    `;
    // InterfaceDeclaration (1) + TypeAliasDeclaration (1) = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should handle code with only comments', () => {
    const code = '// This is a comment';
    expect(предме计数器(code)).toBe(0);
  });

  it('should handle empty code', () => {
    const code = '';
    expect(предме计数器(code)).toBe(0);
  });

  it('should count multiple statements on separate lines', () => {
    const code = `
      let a = 1;
      let b = 2;
    `;
    // VariableStatement (1) + VariableStatement (1) = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should count multiple statements on the same line', () => {
    // TypeScript parser handles this naturally.
    const code = 'let a = 1; let b = 2;';
    // VariableStatement (1) + VariableStatement (1) = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should not count the block in an if statement itself, but its content', () => {
    const code = `
      if (true) {
        let a = 1;
        let b = 2;
      }
    `;
    // IfStatement (1) + VariableStatement (1) + VariableStatement (1) = 3
    expect(предме计数器(code)).toBe(3);
  });

    it('should count a for-of loop and its body', () => {
        const code = `
            const arr = [1, 2];
            for (const item of arr) {
                console.log(item);
            }
        `;
        // VariableStatement (const arr) (1)
        // ForOfStatement: Initializer (const item) (1) + Expression (of arr) (1)
        // Body: ExpressionStatement (console.log) (1)
        // Total = 1 + 1 + 1 + 1 = 4
        expect(предме计数器(code)).toBe(4);
    });

    it('should count a try-catch-finally statement', () => {
        const code = `
            try {
                doSomething();
            } catch (e) {
                handleError();
            } finally {
                cleanup();
            }
        `;
        // TryStatement (1)
        // Body of try: ExpressionStatement (doSomething) (1)
        // CatchClause: (catch(e)) - the clause itself is part of TryStatement.
        // Body of catch: ExpressionStatement (handleError) (1)
        // Body of finally: ExpressionStatement (cleanup) (1)
        // Total = 1 (Try) + 1 (doSomething) + 1 (handleError) + 1 (cleanup) = 4
        expect(предме计数器(code)).toBe(4);
    });
});
