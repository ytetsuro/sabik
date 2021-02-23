import { Maintainability } from './Maintainability';
import { HalsteadVolume } from '../Halstead/MetricsValue/HalsteadVolume';
import { CognitiveComplexity } from '../CognitiveComplexity/CognitiveComplexity';
import { LogicalLineOfCode } from '../LineOfCode/MetricsValue/LogicalLineOfCode';
import { MetricsValue } from '../MetricsValue';

export class Calculator {
  readonly targetMetrics = [
    HalsteadVolume,
    LogicalLineOfCode,
    CognitiveComplexity,
  ];

  calculate(metricsList: MetricsValue[]): MetricsValue[] {
    const halsteadVolume = <HalsteadVolume>(
      metricsList.find((row) => row instanceof HalsteadVolume)!
    );
    const logicalLineOfCode = <LogicalLineOfCode>(
      metricsList.find((row) => row instanceof LogicalLineOfCode)!
    );
    const cognitiveComplexity = <CognitiveComplexity>(
      metricsList.find((row) => row instanceof CognitiveComplexity)!
    );

    return [
      new Maintainability(
        halsteadVolume,
        cognitiveComplexity,
        logicalLineOfCode
      ),
    ];
  }
}
