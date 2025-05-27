import { Engine as PhpParserEngine, Program, Node } from 'php-parser';
import { ASTGenerator as PHPASTGenerator } from '../ASTGenerator'; // Though might not be used directly if parsing strings
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

    // Wrap the Program node with our PHPASTNodeWrapper.
    // The PHPASTNodeWrapper constructor takes (node: Node, sourceFile: Program, parentNode?: ASTNode)
    // For the whole program, the node itself is the sourceFile.
    const wrapperNode = new PHPASTNodeWrapper(programNode, programNode);
    const countableNode = new PHPLineOfCodeCountableNode(wrapperNode);

    return countableNode.countStatements();
  };

  it('should count a simple assignment', () => {
    const code = '$a = 1;';
    expect(countStatementsInPhpCode(code)).toBe(1); // Assign
  });

  it('should count basic if and return statements', () => {
    const code = `
      if (true) {
          return 1;
      }`;
    // If (1) + Return (1) = 2
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should count a for loop correctly (initializer, condition, incrementor, body statement)', () => {
    const code = `
      for ($i = 0; $i < 1; $i++) {
        echo $i;
      }
    `;
    // For loop parts: Assign ($i = 0) (1) + Binary ($i < 1) (1) + PostInc ($i++) (1)
    // Body: Echo (echo $i) (1)
    // Total = 4
    expect(countStatementsInPhpCode(code)).toBe(4);
  });

  it('should count an empty block statement (though PHP usually doesnt have standalone empty blocks as statements)', () => {
    // PHP doesn't really have a standalone "empty block statement" like JS {}.
    // An empty block in PHP is usually part of a control structure.
    // If we parse just "{}", it might be a syntax error or an empty program.
    // Let's test an empty if block.
    const code = 'if (true) {}'; 
    // If (1). The empty block itself isn't usually counted as a separate statement.
    // The countStatements logic for PHP should handle this by counting the `If` and then finding 0 statements in its body.
    expect(countStatementsInPhpCode(code)).toBe(1); 
  });

  it('should count function and class declarations', () => {
    const code = `
      function foo() {}
      class Bar {}
    `;
    // Function (1) + Class (1) = 2
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should count interface and trait declarations', () => {
    const code = `
      interface Foo {}
      trait Bar {}
    `;
    // Interface (1) + Trait (1) = 2
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should handle code with only comments', () => {
    const code = '// This is a comment';
    expect(countStatementsInPhpCode(code)).toBe(0);
  });

  it('should handle empty PHP code (only <?php ?>)', () => {
    const code = ' '; // Effectively an empty program once <?php is added
    expect(countStatementsInPhpCode(code)).toBe(0);
  });

  it('should count multiple statements on separate lines', () => {
    const code = `
      $a = 1;
      $b = 2;
    `;
    // Assign (1) + Assign (1) = 2
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should count multiple statements on the same line', () => {
    const code = '$a = 1; $b = 2;';
    // Assign (1) + Assign (1) = 2
    expect(countStatementsInPhpCode(code)).toBe(2);
  });

  it('should not count the block in an if statement itself, but its content', () => {
    const code = `
      if (true) {
        $a = 1;
        $b = 2;
      }
    `;
    // If (1) + Assign (1) + Assign (1) = 3
    expect(countStatementsInPhpCode(code)).toBe(3);
  });

  it('should count a foreach loop and its body', () => {
    const code = `
      $arr = [1, 2];
      foreach ($arr as $item) {
        echo $item;
      }
    `;
    // Assign ($arr) (1)
    // Foreach (1) - (php-parser AST for foreach usually counts the structure itself as one, not its parts like JS for)
    // Body: Echo (1)
    // Total = 1 + 1 + 1 = 3.
    // This needs to be verified against how the PHP `countStatements` for `ASTKind.FOR` (which is generic) vs a specific Foreach ASTKind would work.
    // The current PHP `countStatements` has specific logic for `ASTKind.FOR` to count its parts.
    // `php-parser` has a distinct `Foreach` kind. If `STATEMENT_KINDS` includes `Foreach`, and it's not `ASTKind.FOR`, it would be 1 + body.
    // Let's assume `Foreach` is a statement kind and its parts are not separately counted like `For`.
    // If `STATEMENT_KINDS` has `ASTKind.FOREACH` (assuming it exists in ASTKind.ts or is mapped), then:
    // Assign (1) + Foreach (1) + Echo (1) = 3
    // The ASTKind.ts provided does not list FOREACH. This test might fail or need adjustment based on how foreach is parsed and counted.
    // For now, let's assume a generic 'loop' statement counts as 1 plus its body.
    // If `foreach` is parsed as a generic `For` node by the current setup, it would be more.
    // Given the current `countStatements` for PHP, it looks for `ASTKind.FOR`. `php-parser` does have `foreach` as a distinct kind.
    // The `STATEMENT_KINDS` in `PHPLineOfCodeCountableNode` needs to include `ASTKind.FOREACH` if it exists.
    // If it doesn't, this test will be revealing.
    // For now, expecting 3: $arr=1 (1), foreach structure (1), echo (1).
    expect(countStatementsInPhpCode(code)).toBe(3);
  });

    it('should count a try-catch-finally statement', () => {
        const code = `
            try {
                doSomething();
            } catch (Exception $e) {
                handleError();
            } finally {
                cleanup();
            }
        `;
        // Try (1) (assuming 'try' itself is a statement kind or its block implies it)
        // Body of try: Call to doSomething() (1) (as an expression statement)
        // Catch clause: (catch(Exception $e)) - php-parser might make this a node.
        // Body of catch: Call to handleError() (1)
        // Finally clause:
        // Body of finally: Call to cleanup() (1)
        // Total = 1 (Try structure) + 1 (doSomething) + 1 (handleError) + 1 (cleanup) = 4
        // This depends on `ASTKind.TRY`, `ASTKind.CATCH`, `ASTKind.FINALLY` being in `STATEMENT_KINDS`.
        // `ASTKind.CATCH` is present. `TRY` and `FINALLY` are not explicitly in the ASTKind.ts provided.
        // This test will help verify. Assuming the main try structure counts as 1.
        expect(countStatementsInPhpCode(code)).toBe(4);
    });
});
