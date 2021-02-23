import { Decimal } from 'decimal.js';
import { MetricsType } from '../MetricsType';
import { MetricsValue } from '../MetricsValue';
import { HalsteadVolume } from '../Halstead/MetricsValue/HalsteadVolume';
import { CognitiveComplexity } from '../CognitiveComplexity/CognitiveComplexity';
import { LogicalLineOfCode } from '../LineOfCode/MetricsValue/LogicalLineOfCode';

export class Maintainability implements MetricsValue {
  public readonly type = MetricsType.Maintainability;
  constructor(
    private readonly halsteadVolume: HalsteadVolume,
    private readonly complexity: CognitiveComplexity,
    private readonly logicalLineOfCode: LogicalLineOfCode
  ) {}

  valueOf() {
    const halstead = new Decimal(5.2).mul(
      Decimal.log(Number(this.halsteadVolume))
    );
    const complexity = new Decimal(0.23).mul(Number(this.complexity));
    const logicalLineOfCode = new Decimal(16.2).mul(
      Decimal.log(Number(this.logicalLineOfCode))
    );

    const maintainability = new Decimal(171)
      .minus(halstead)
      .minus(complexity)
      .minus(logicalLineOfCode)
      .mul(100)
      .div(171);

    return Math.max(0, Number(maintainability));
  }
}
