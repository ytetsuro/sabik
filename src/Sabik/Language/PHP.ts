import { inject, injectable, named } from 'inversify';
import { Analyzer } from '../../Analyzer/Analyzer';
import { LanguageAnalyzer } from '../Analyzer/LanguageAnalyzer';

@injectable()
export class PHP extends LanguageAnalyzer {
  public readonly extensions = ['.php'];
  constructor(@inject(Analyzer) @named('PHP') analyzer: Analyzer) {
    super(analyzer);
  }
}
