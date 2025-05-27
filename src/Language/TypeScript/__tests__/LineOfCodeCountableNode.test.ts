import * as ts from 'typescript';
// import { ASTGenerator as TypeScriptASTGenerator } from '../ASTGenerator'; // Not used in this file
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
    // IfStatement @ D0 (counts: +1). Block for D1.
    // ReturnStatement @ D1 (counts: +1).
    // Total = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should count a for loop correctly (initializer, condition, incrementor, body statement)', () => {
    const code = `
      for (let i = 0; i < 1; i++) { // For @ D0. Parts (initializer, condition, incrementor) @ D1 (counts: +3)
        console.log(i);             // Expr @ D1 (counts: +1).
      }
    `;
    // Total = 3 + 1 = 4
    expect(предме计数器(code)).toBe(4);
  });

  it('should count an empty block statement if it is standalone', () => {
    const code = '{}'; // Standalone empty block
    // Empty block @ D0, is special cased to count if not part of function/control structure body.
    // Based on _handleBlock: counts if statements.length === 0 and not part of function/control.
    expect(предме计数器(code)).toBe(1); 
  });

  it('should count function and class declarations', () => {
    const code = `
      function foo() {} // FuncDecl @ D0 (counts: +1)
      class Bar {}       // ClassDecl @ D0 (counts: +1)
    `;
    // Total = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should count interface and type alias declarations', () => {
    const code = `
      interface Foo {}   // InterfaceDecl @ D0 (counts: +1)
      type Bar = number; // TypeAliasDecl @ D0 (counts: +1)
    `;
    // Total = 2
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
      let a = 1; // Var @ D0 (counts: +1)
      let b = 2; // Var @ D0 (counts: +1)
    `;
    // Total = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should count multiple statements on the same line', () => {
    const code = 'let a = 1; let b = 2;';
    // Var @ D0 (counts: +1)
    // Var @ D0 (counts: +1)
    // Total = 2
    expect(предме计数器(code)).toBe(2);
  });

  it('should not count the block in an if statement itself, but its content', () => {
    const code = `
      if (true) {    // If @ D0 (counts: +1). Block for D1.
        let a = 1;   // Var @ D1 (counts: +1).
        let b = 2;   // Var @ D1 (counts: +1).
      }
    `;
    // Total = 1 + 1 + 1 = 3
    expect(предме计数器(code)).toBe(3);
  });

  it('should count a for-of loop and its body', () => {
    const code = `
        const arr = [1, 2];       // Var @ D0 (counts: +1)
        for (const item of arr) { // ForOf @ D0 (counts: +1). Block for D1.
                                  // Initializer and expression are part of ForOf, not separate LLOC.
            console.log(item);    // Expr @ D1 (counts: +1)
        }
    `;
    // Expected: 1 (arr) + 1 (forof structure) + 1 (console.log) = 3
    expect(предме计数器(code)).toBe(3);
  });

  it('should count a try-catch-finally statement', () => {
    const code = `
        try {             // Try @ D0 (counts: +1). Block for D1.
            doSomething();  // Expr @ D1 (counts: +1).
        } catch (e) {     // CatchClause itself not counted. Block for D1.
            handleError();  // Expr @ D1 (counts: +1).
        } finally {       // Finally block for D1.
            cleanup();      // Expr @ D1 (counts: +1).
        }
    `;
    // Expected: 1 (Try) + 1 (doSomething) + 1 (handleError) + 1 (cleanup) = 4
    expect(предме计数器(code)).toBe(4);
  });

  describe('Max Nesting Depth Tests (<=2)', () => {
    it('should count statements only up to depth 2 in nested if statements', () => {
      const code = ` // Depth 0 context
        if (true) {        // If @ D0 (counts: +1). Block for D1.
          let a = 1;       // Var @ D1 (counts: +1).
          if (true) {      // If @ D1 (counts: +1). Block for D2.
            let b = 2;     // Var @ D2 (counts: +1).
            if (true) {    // If @ D2 (counts: +1). Block for D3.
              let c = 3;   // Var @ D3 (NOT counted).
              let d = 7;   // Var @ D3 (NOT counted).
            }
            let e = 4;     // Var @ D2 (counts: +1).
          }
          let f = 5;       // Var @ D1 (counts: +1).
        }
        let g = 6;         // Var @ D0 (counts: +1).
      `;
      // Expected: 1(if D0) + 1(a D1) + 1(if D1) + 1(b D2) + 1(if D2) + 1(e D2) + 1(f D1) + 1(g D0) = 8
      expect(предме计数器(code)).toBe(8);
    });

    it('should count statements in a for loop body according to nesting depth', () => {
      const code = ` // Depth 0 context
        for (let i = 0; i < 1; i++) { // For @ D0. Parts (initializer, condition, incrementor) @ D1 (counts: +3)
                                      // Block for D1.
          let a = 1;                  // Var @ D1 (counts: +1).
          if (true) {                 // If @ D1 (counts: +1). Block for D2.
            let b = 2;                // Var @ D2 (counts: +1).
            console.log(b);           // Expr @ D2 (counts: +1).
            if (true) {               // If @ D2 (counts: +1). Block for D3.
              let c = 3;              // Var @ D3 (NOT counted).
            }
          }
        }
      `;
      // Expected: 3(for parts) + 1(a) + 1(if D1) + 1(b D2) + 1(console D2) + 1(inner if D2) = 8
      expect(предме计数器(code)).toBe(8);
    });

    it('should handle functions defined and called within nesting limits', () => {
      const code = ` // Depth 0 context
        function outer() {      // FuncDecl @ D0 (counts: +1). Block for D1.
          let x = 1;            // Var @ D1 (counts: +1).
          function inner() {    // FuncDecl @ D1 (counts: +1). Block for D2.
            let y = 2;          // Var @ D2 (counts: +1).
            if (true) {         // If @ D2 (counts: +1). Block for D3.
                let z = 3;      // Var @ D3 (NOT counted).
            }
          }
          inner();              // ExprStatement (call) @ D1 (counts: +1).
        }
        outer();                // ExprStatement (call) @ D0 (counts: +1).
      `;
      // Expected: 1(outer) + 1(x) + 1(inner decl) + 1(y) + 1(if in inner) + 1(inner() call) + 1(outer() call) = 7
      expect(предме计数器(code)).toBe(7);
    });

    it('should not count statements in a block starting at depth 3', () => {
      const code = ` // Depth 0 context
        if (true) {        // If @ D0 (counts: +1). Block for D1.
          if (true) {      // If @ D1 (counts: +1). Block for D2.
            if (true) {    // If @ D2 (counts: +1). Block for D3.
              let c = 3;   // Var @ D3 (NOT counted).
              let d = 7;   // Var @ D3 (NOT counted).
            }
          }
        }
      `;
      // Expected: 1(if D0) + 1(if D1) + 1(if D2) = 3
      expect(предме计数器(code)).toBe(3);
    });

    it('should count statements in a switch case according to depth', () => {
        const code = ` // Depth 0 context
            switch (val) {      // Switch @ D0 (counts: +1). Cases are at D1.
                case 1:         // CaseClause @ D1 (counts: +1). Statements in case are at D1.
                    let x = 1;  // Var @ D1 (counts: +1).
                    if (true) { // If @ D1 (counts: +1). Block for D2.
                        let y = 2; // Var @ D2 (counts: +1).
                    }
                    break;      // Break @ D1 (counts: +1).
                case 2:         // CaseClause @ D1 (counts: +1). Statements in case are at D1.
                    if (true) { // If @ D1 (counts: +1). Block for D2.
                        if (true) { // If @ D2 (counts: +1). Block for D3.
                           let z = 3; // Var @ D3 (NOT counted).
                        }
                    }
                    break;      // Break @ D1 (counts: +1).
                default:        // DefaultClause @ D1 (counts: +1).
                    let d = 4;  // Var @ D1 (counts: +1).
            }
        `;
        // Expected: 1(switch) + 1(case1) + 1(x) + 1(if_y) + 1(y) + 1(break1) + 1(case2) + 1(if_z_outer) + 1(if_z_inner) + 1(break2) + 1(default) + 1(d) = 12
        expect(предме计数器(code)).toBe(12);
    });
  });
});
