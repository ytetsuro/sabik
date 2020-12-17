import { Complexity } from '../../Language/PHP/Converter/Complexity';
import { LineOfCode } from '../../Language/PHP/Converter/LineOfCode';
import { Halstead } from '../../Language/PHP/Converter/Halstead';
import { ASTGenerator } from '../../Language/PHP/ASTGenerator';
import { LanguageConfig } from './LanguageConfig';

export class PHP implements LanguageConfig {
  public readonly extensions = ['.php'];
  public readonly complexityConverter = new Complexity();
  public readonly lineOfCodeConverter = new LineOfCode();
  public readonly halsteadConverter = new Halstead();
  public readonly astGenerator = new ASTGenerator();
}
