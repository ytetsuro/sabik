import { Calculator } from '../Calculator';
import { LineOfCodeCountableNode } from '../../../TestHelpers/LineOfCodeCountableNode';
import { LogicalLineOfCode } from '../MetricsValue/LogicalLineOfCode';
import { PhysicalLineOfCode } from '../MetricsValue/PhysicalLineOfCode';

describe('Line of code Calculator Class.', () => {
  it('should count line by code', () => {
    const analyzer = new Calculator();
    const actual = analyzer.calculate(
      new LineOfCodeCountableNode(`
      // this is Test Code
      if (true) 
      {
          return 1;
      }`)
    );

    expect(Number(actual.find((row) => row instanceof LogicalLineOfCode))).toBe(
      4
    );
    expect(
      Number(actual.find((row) => row instanceof PhysicalLineOfCode))
    ).toBe(6);
  });
});
