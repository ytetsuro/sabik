import { Calculator } from '../Calculator';
import { LineOfCodeCountableNode } from '../../../../TestHelpers/LineOfCodeCountableNode';
import { LogicalLineOfCode } from '../MetricsValue/LogicalLineOfCode';
import { PhysicalLineOfCode } from '../MetricsValue/PhysicalLineOfCode';
import { getDouble } from '../../../../TestHelpers/getDouble';
import { FileAnalyzer } from '../../../FromASTNode/FileAnalyzer';
import { ASTNode } from '../../../../TestHelpers/ASTNode';
import { ASTNodeSource } from '../../../FromASTNode/ASTNodeSource';

describe('Line of code Calculator Class.', () => {
  it('should count line by code', () => {
    const calculator = new Calculator(
      [
        getDouble(FileAnalyzer, {
          analyze: (list: ASTNodeSource[]) =>
            list.map(({ file, astNode }) => ({
              file,
              codePoints: [],
              astNode,
            })),
        }),
      ],
      {
        convert: (_) =>
          new LineOfCodeCountableNode(`
          // this is Test Code
          if (true) 
          {
              return 1;
          }`),
      }
    );
    const actual = calculator.analyze([
      {
        astNode: new ASTNode(':root:0:0', {
          'C:DummyClass:0:20': {},
        }),
        file: {
          fullPath: '/tmp/dummy.ts',
          relativePath: 'dummy.ts',
          extension: 'ts',
        },
      },
    ]);

    expect(Number(actual[0].getMetricsByMetricsValue(LogicalLineOfCode))).toBe(4);
    expect(Number(actual[0].getMetricsByMetricsValue(PhysicalLineOfCode))).toBe(6);
  });
});
