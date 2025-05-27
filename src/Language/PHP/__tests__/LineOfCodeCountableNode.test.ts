import { Engine as PhpParserEngine, Program } from 'php-parser'; // Removed unused 'Node'
// import { ASTGenerator as PHPASTGenerator } from '../ASTGenerator'; // Not used
import { ASTNode as PHPASTNodeWrapper } from '../ASTNode';
import { LineOfCodeCountableNode as PHPLineOfCodeCountableNode } from '../LineOfCodeCountableNode';

describe('PHPLineOfCodeCountableNode', () => {
  // Helper function to parse PHP code string and get the main AST Program node
  const parsePhpCode = (code: string): Program => {
    const parser = new PhpParserEngine({
      parser: {
        extractDoc: true,
        php7: true, // Enable PHP 7 features
      },
      lexer: {
        all_tokens: true,
      },
    });
    // Add <?php tag if not present, as php-parser expects it for most code.
    const fullCode = code.trim().startsWith('<?php') ? code : `<?php ${code}`;
    return parser.parseCode(fullCode, 'test.php');
  };

  const countStatementsInPhpCode = (code: string): number => {
    const programNode = parsePhpCode(code);

    const wrapperNode = new PHPASTNodeWrapper(programNode, programNode);
    const countableNode = new PHPLineOfCodeCountableNode(wrapperNode);

    return countableNode.countStatements();
  };

  it('should count a simple assignment', () => {
    const code = '$a = 1;';
    expect(countStatementsInPhpCode(code)).toBe(1);
  });

  it('should count basic if and return statements', () => {
    const code = `
      if (true) { // If @ D0 (+1)
          return 1; // Return @ D1 (+1)
      }`;
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should count a for loop correctly (initializer, condition, incrementor, body statement)', () => {
    const code = `
      for ($i = 0; $i < 1; $i++) { // For parts @ D1 (+3)
        echo $i;                   // Echo @ D1 (+1)
      }
    `;
    expect(countStatementsInPhpCode(code)).toBe(4);
  });

  it('should count an empty if block', () => {
    const code = 'if (true) {}'; 
    // If @ D0 (+1). Empty block does not add.
    expect(countStatementsInPhpCode(code)).toBe(1); 
  });

  it('should count function and class declarations', () => {
    const code = `
      function foo() {} // FuncDecl @ D0 (+1)
      class Bar {}       // ClassDecl @ D0 (+1)
    `;
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should count interface and trait declarations', () => {
    const code = `
      interface Foo {} // InterfaceDecl @ D0 (+1)
      trait Bar {}     // TraitDecl @ D0 (+1)
    `;
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should handle code with only comments', () => {
    const code = '// This is a comment';
    expect(countStatementsInPhpCode(code)).toBe(0);
  });

  it('should handle empty PHP code (only <?php ?>)', () => {
    const code = ' '; 
    expect(countStatementsInPhpCode(code)).toBe(0);
  });

  it('should count multiple statements on separate lines', () => {
    const code = `
      $a = 1; // Assign @ D0 (+1)
      $b = 2; // Assign @ D0 (+1)
    `;
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should count multiple statements on the same line', () => {
    const code = '$a = 1; $b = 2;';
    // Assign @ D0 (+1), Assign @ D0 (+1)
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should not count the block in an if statement itself, but its content', () => {
    const code = `
      if (true) { // If @ D0 (+1)
        $a = 1;   // Assign @ D1 (+1)
        $b = 2;   // Assign @ D1 (+1)
      }
    `;
    expect(countStatementsInPhpCode(code)).toBe(3);
  });

  it('should count a foreach loop and its body', () => {
    const code = `
      $arr = [1, 2];           // Assign @ D0 (+1)
      foreach ($arr as $item) { // Foreach @ D0 (+1)
        echo $item;             // Echo @ D1 (+1)
      }
    `;
    // PHP's foreach is counted as 1 for the structure, plus body.
    expect(countStatementsInPhpCode(code)).toBe(3);
  });

  it('should count a try-catch-finally statement', () => {
    const code = `
        try {                 // Try @ D0 (+1)
            doSomething();    // Call (exprstmt) @ D1 (+1)
        } catch (Exception $e) { // Catch @ D1 (+1)
            handleError();    // Call (exprstmt) @ D2 (+1)
        } finally {           // Finally @ D1 (+1) (This assumes 'finally' itself is a counted statement type)
            cleanup();        // Call (exprstmt) @ D2 (+1)
        }
    `;
    // Expected: try(D0,1) + doSomething(D1,1) + catch(D1,1) + handleError(D2,1) + finally(D1,1) + cleanup(D2,1) = 6
    // Note: PHP's _handleTry counts catch and finally clauses at currentDepth+1 if they exist.
    // Statements inside their blocks are then currentDepth+2.
    expect(countStatementsInPhpCode(code)).toBe(6);
  });

  describe('PHP Max Nesting Depth Tests (<=2)', () => {
    it('should count statements only up to depth 2 in nested if statements', () => {
      const code = ` // Depth 0 context
        if (true) {        // If @ D0 (+1). Block for D1.
          $a = 1;          // Assign @ D1 (+1).
          if (true) {      // If @ D1 (+1). Block for D2.
            $b = 2;        // Assign @ D2 (+1).
            if (true) {    // If @ D2 (+1). Block for D3.
              $c = 3;      // Assign @ D3 (NOT counted).
              $d = 7;      // Assign @ D3 (NOT counted).
            }
            $e = 4;        // Assign @ D2 (+1).
          }
          $f = 5;          // Assign @ D1 (+1).
        }
        $g = 6;            // Assign @ D0 (+1).
      `;
      // Expected: 1(if D0) + 1(a D1) + 1(if D1) + 1(b D2) + 1(if D2) + 1(e D2) + 1(f D1) + 1(g D0) = 8
      expect(countStatementsInPhpCode(code)).toBe(8);
    });

    it('should count statements in a for loop body according to nesting depth', () => {
      const code = ` // Depth 0 context
        for ($i = 0; $i < 1; $i++) { // For @ D0. Parts (init,cond,loop) @ D1 (counts: +3)
                                     // Block for D1.
          $a = 1;                     // Assign @ D1 (+1).
          if (true) {                // If @ D1 (+1). Block for D2.
            $b = 2;                  // Assign @ D2 (+1).
            echo $b;                 // Echo @ D2 (+1). (exprstmt)
            if (true) {              // If @ D2 (+1). Block for D3.
              $c = 3;                // Assign @ D3 (NOT counted).
            }
          }
        }
      `;
      // Expected: 3(for parts) + 1(a) + 1(if D1) + 1(b D2) + 1(echo D2) + 1(inner if D2) = 8
      expect(countStatementsInPhpCode(code)).toBe(8);
    });

    it('should handle functions defined and called within nesting limits', () => {
      const code = ` // Depth 0 context
        function outer() {      // FuncDecl @ D0 (+1). Block for D1.
          $x = 1;               // Assign @ D1 (+1).
          function inner() {    // FuncDecl @ D1 (+1). Block for D2.
            $y = 2;             // Assign @ D2 (+1).
            if (true) {         // If @ D2 (+1). Block for D3.
                $z = 3;         // Assign @ D3 (NOT counted).
            }
          }
          inner();              // Call (exprstmt) @ D1 (+1).
        }
        outer();                // Call (exprstmt) @ D0 (+1).
      `;
      // Expected: 1(outer func) + 1(x) + 1(inner func) + 1(y) + 1(if in inner) + 1(inner() call) + 1(outer() call) = 7
      expect(countStatementsInPhpCode(code)).toBe(7);
    });

    it('should not count statements in a block starting at depth 3', () => {
      const code = ` // Depth 0 context
        if (true) {        // If @ D0 (+1). Block for D1.
          if (true) {      // If @ D1 (+1). Block for D2.
            if (true) {    // If @ D2 (+1). Block for D3.
              $c = 3;      // Assign @ D3 (NOT counted).
              $d = 7;      // Assign @ D3 (NOT counted).
            }
          }
        }
      `;
      // Expected: 1(if D0) + 1(if D1) + 1(if D2) = 3
      expect(countStatementsInPhpCode(code)).toBe(3);
    });

    it('should count statements in a switch case according to depth', () => {
        const code = ` // Depth 0 context
            switch ($val) {      // Switch @ D0 (+1). Cases are at D1.
                case 1:          // Case @ D1 (+1). Statements in case are at D1.
                    $x = 1;      // Assign @ D1 (+1).
                    if (true) {  // If @ D1 (+1). Block for D2.
                        $y = 2;  // Assign @ D2 (+1).
                    }
                    break;       // Break @ D1 (+1). (Assuming break is a statement kind)
                case 2:          // Case @ D1 (+1). Statements in case are at D1.
                    if (true) {  // If @ D1 (+1). Block for D2.
                        if (true) { // If @ D2 (+1). Block for D3.
                           $z = 3;  // Assign @ D3 (NOT counted).
                        }
                    }
                    break;       // Break @ D1 (+1).
                default:         // Case (default) @ D1 (+1).
                    $d = 4;      // Assign @ D1 (+1).
            }
        `;
        // Expected: 1(switch) + 1(case1) + 1(x) + 1(if_y) + 1(y) + 1(break1) + 1(case2) + 1(if_z_outer) + 1(if_z_inner) + 1(break2) + 1(default_case) + 1(d) = 12
        // ASTKind.BREAK is not in PHP's STATEMENT_KINDS in LineOfCodeCountableNode.ts.
        // If 'break' is counted, then 12. If not, 10.
        // The current PHP STATEMENT_KINDS does not list BREAK. So it should be 10.
        // Let's assume 'break' is NOT counted for now, per current STATEMENT_KINDS.
        // Updated expected: 1(switch) + 1(case1) + 1(x) + 1(if_y) + 1(y) + 0(break1) + 1(case2) + 1(if_z_outer) + 1(if_z_inner) + 0(break2) + 1(default_case) + 1(d) = 10
        expect(countStatementsInPhpCode(code)).toBe(10);
    });
  });
});
