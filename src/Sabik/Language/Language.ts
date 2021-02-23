import { LanguageConfig } from './LanguageConfig';
import { ASTGenerator as SabikASTGenerator } from '../Analyzer/ASTGenerator';
import { ASTGenerator } from '../ASTGenerator';
import { CountableNodeConverter } from '../Analyzer/CountableNodeConverter';
import { ComplexityCountableNode } from '../../Calculator/CognitiveComplexity/Adapter/ComplexityCountableNode';
import { HalsteadCountableNode } from '../../Calculator/Halstead/Adapter/HalsteadCountableNode';
import { LineOfCodeCountableNode } from '../../Calculator/LineOfCode/Adapter/LineOfCodeCountableNode';
import { injectable, multiInject } from 'inversify';
import { Types } from '../../types/Types';

@injectable()
export class Language {
  constructor(
    @multiInject(Types.languageConfig) private configs: LanguageConfig[]
  ) {}

  addConfig(config: LanguageConfig) {
    this.configs.push(config);
  }

  isSupport(extension: string) {
    return this.configs.some(({ extensions }) =>
      extensions.includes(extension)
    );
  }

  createASTNodeGenerator() {
    const astGeneratorPerExtension = this.configs.reduce(
      (map, { extensions, astGenerator }) =>
        extensions.reduce(
          (map, extension) => map.set(extension, astGenerator),
          map
        ),
      new Map<string, ASTGenerator>()
    );

    return new SabikASTGenerator(astGeneratorPerExtension);
  }

  createCountableNodeConverter(
    by: 'complexityConverter'
  ): CountableNodeConverter<ComplexityCountableNode>;
  createCountableNodeConverter(
    by: 'halsteadConverter'
  ): CountableNodeConverter<HalsteadCountableNode>;
  createCountableNodeConverter(
    by: 'lineOfCodeConverter'
  ): CountableNodeConverter<LineOfCodeCountableNode>;

  createCountableNodeConverter(
    by: 'complexityConverter' | 'halsteadConverter' | 'lineOfCodeConverter'
  ) {
    return new CountableNodeConverter(
      <any>this.extractCountableNodeConverter(by)
    );
  }

  private extractCountableNodeConverter<T extends keyof LanguageConfig>(
    propertyName: T
  ): Map<LanguageConfig['astNodeConstructor'], LanguageConfig[T]> {
    return this.configs.reduce(
      (map, config) => map.set(config.astNodeConstructor, config[propertyName]),
      new Map()
    );
  }
}
