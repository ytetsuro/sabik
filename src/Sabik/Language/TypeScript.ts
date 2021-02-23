import { injectable } from 'inversify';
import { Complexity } from '../../Language/TypeScript/Converter/Complexity';
import { LineOfCode } from '../../Language/TypeScript/Converter/LineOfCode';
import { Halstead } from '../../Language/TypeScript/Converter/Halstead';
import { ASTGenerator } from '../../Language/TypeScript/ASTGenerator';
import { LanguageConfig } from './LanguageConfig';
import { ASTNode } from '../../Language/TypeScript/ASTNode';

@injectable()
export class TypeScript implements LanguageConfig {
  public readonly extensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'];
  public readonly complexityConverter = new Complexity();
  public readonly lineOfCodeConverter = new LineOfCode();
  public readonly halsteadConverter = new Halstead();
  public readonly astGenerator = new ASTGenerator();
  public readonly astNodeConstructor = ASTNode;
}
