import { Converter } from '../../Analyzer/Adapter/Converter';
import { ComplexityCountableNode } from '../../Calculator/CognitiveComplexity/Adapter/ComplexityCountableNode';
import { LineOfCodeCountableNode } from '../../Calculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { HalsteadCountableNode } from '../../Calculator/Halstead/Adapter/HalsteadCountableNode';
import { ASTGenerator } from '../ASTGenerator';
import { ASTNode } from '../../Analyzer/Adapter/ASTNode';

export interface LanguageConverter {
  readonly complexityConverter: Converter<ComplexityCountableNode>;
  readonly lineOfCodeConverter: Converter<LineOfCodeCountableNode>;
  readonly halsteadConverter: Converter<HalsteadCountableNode>;
  readonly astGenerator: ASTGenerator;
  readonly astNodeConstructor: new (...args: any) => ASTNode;
}
