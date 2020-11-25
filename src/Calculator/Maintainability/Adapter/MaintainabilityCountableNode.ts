import { ComplexityStore } from '../../CognitiveComplexity/ComplexityStore';
import { Halstead } from '../../Halstead/Halstead';
import { LineOfCode } from '../../LineOfCode/LineOfCode';

export interface MaintainabilityCountableNode {
  complexity: ComplexityStore;
  halstead: Halstead;
  lineOfCode: LineOfCode;
}
