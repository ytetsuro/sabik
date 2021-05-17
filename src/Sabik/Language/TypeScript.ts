import { inject, injectable, named } from 'inversify';
import { Analyzer } from '../../Analyzer/Analyzer';
import { LanguageAnalyzer } from '../Analyzer/LanguageAnalyzer';

@injectable()
export class TypeScript extends LanguageAnalyzer {
  public readonly extensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'];
  constructor(@inject(Analyzer) @named('TypeScript') analyzer: Analyzer) {
    super(analyzer);
  }
}
