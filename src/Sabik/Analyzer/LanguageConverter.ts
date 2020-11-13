import {Converter} from '../../Analyzer/Adapter/Converter'
import {ComplexityCountableNode} from '../../Calculator/CongnitiveComplexity/Adapter/ComplexityCountableNode'
import {LineOfCodeCountableNode} from '../../Calculator/LineOfCode/Adapter/LineOfCodeCountableNode'
import {HalsteadCountableNode} from '../../Calculator/Halstead/Adapter/HalsteadCountableNode'
import {ASTGenerator} from '../ASTGenerator'

export interface LanguageConverter
{
    readonly complexityConverter: Converter<ComplexityCountableNode>;
    readonly lineOfCodeConverter: Converter<LineOfCodeCountableNode>;
    readonly halsteadConverter: Converter<HalsteadCountableNode>;
    readonly astGenerator: ASTGenerator;
}
