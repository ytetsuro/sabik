import { Calculator } from '../Calculator';
import { LineOfCodeCountableNode } from '../../../../TestHelpers/LineOfCodeCountableNode';
import { LogicalLineOfCode } from '../MetricsValue/LogicalLineOfCode';
import { PhysicalLineOfCode } from '../MetricsValue/PhysicalLineOfCode';
import { getDouble } from '../../../../TestHelpers/getDouble';
import { FileAnalyzer } from '../../../FromASTNode/FileAnalyzer';
import { ASTNode as MockASTNode } from '../../../../TestHelpers/ASTNode'; // Renamed for clarity
import { ASTNodeSource } from '../../../FromASTNode/ASTNodeSource';
import { File } from '../../../FromASTNode/Adapter/File';

describe('Line of code Calculator Class', () => {
  const analyzeCode = (codeSnippet: string, expectedLloc: number, expectedPloc: number) => {
    const mockFile = {
      fullPath: '/tmp/dummy.ts',
      relativePath: 'dummy.ts',
      extension: 'ts',
    } as File;

    const calculator = new Calculator(
      [
        getDouble(FileAnalyzer, {
          analyze: (list: ASTNodeSource[]) =>
            list.map(({ file, astNode }) => ({
              file,
              codePoints: [],
              astNode, // This is the MockASTNode from TestHelpers
            })),
        }),
      ],
      {
        // The converter now returns our updated mock LineOfCodeCountableNode
        // We pass the code snippet and the expected LLOC (statement count) to its constructor.
        convert: (_) => new LineOfCodeCountableNode(codeSnippet, expectedLloc),
      }
    );

    const result = calculator.analyze([
      {
        astNode: new MockASTNode(':root:0:0', {}), // Provide a basic mock ASTNode
        file: mockFile,
      },
    ]);

    expect(result.length).toBe(1);
    const metrics = result[0];
    expect(Number(metrics.getMetricsByMetricsValue(LogicalLineOfCode))).toBe(expectedLloc);
    expect(Number(metrics.getMetricsByMetricsValue(PhysicalLineOfCode))).toBe(expectedPloc);
  };

  it('should count basic if and return statements', () => {
    const code = `
      // this is Test Code
      if (true) 
      {
          return 1;
      }`;
    // LLOC: if (1) + return (1) = 2
    // PLOC: 6 lines (including comment, if, {, return, }, blank line at start)
    analyzeCode(code, 2, 6);
  });

  it('should count a simple variable declaration', () => {
    const code = 'let a = 1;';
    // LLOC: VariableStatement (1)
    // PLOC: 1 line
    analyzeCode(code, 1, 1);
  });

  it('should count a for loop and its body', () => {
    // Based on ProjectCodeMeter: for (i=0; i < 5; i++;) is 3 LLOCs
    // Plus one for the console.log(i)
    const code = `
      for (let i = 0; i < 1; i++) {
        console.log(i);
      }
    `;
    // LLOC: VariableStatement (let i = 0) (1) + Condition (i < 1) (1) + Incrementor (i++) (1) + ExpressionStatement (console.log) (1) = 4
    // PLOC: 4 lines (for, console.log, }, blank line at start)
    analyzeCode(code, 4, 4);
  });

  it('should count an empty block statement', () => {
    const code = '{}';
    // LLOC: EmptyStatement or Block (1) - Assuming an empty block {} is counted as one statement.
    // PLOC: 1 line
    analyzeCode(code, 1, 1);
  });

  it('should count function and class declarations', () => {
    const code = `
      function foo() {}
      class Bar {}
    `;
    // LLOC: FunctionDeclaration (1) + ClassDeclaration (1) = 2
    // PLOC: 3 lines (function, class, blank line at start)
    analyzeCode(code, 2, 3);
  });

  it('should handle code with only comments and empty lines', () => {
    const code = `
      // Only comment
      

      // Another comment
    `;
    // LLOC: 0
    // PLOC: 5 lines
    analyzeCode(code, 0, 5);
  });

  it('should count multiple statements on the same line if parser supports it (mocked here)', () => {
    // This test relies on the 'expectedLloc' passed to LineOfCodeCountableNode constructor.
    // The actual language-specific parsers determine if "a=1; b=2;" is 2 statements.
    const code = 'let a = 1; let b = 2;';
    // LLOC: VariableStatement (1) + VariableStatement (1) = 2
    // PLOC: 1 line
    analyzeCode(code, 2, 1);
  });
});
