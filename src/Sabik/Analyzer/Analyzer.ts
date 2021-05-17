import { injectable, multiInject } from 'inversify';
import { File } from '../../Analyzer/Adapter/File';
import { LanguageAnalyzer } from './LanguageAnalyzer';

@injectable()
export class Analyzer {
  constructor(
    @multiInject(LanguageAnalyzer)
    private readonly analyzers: LanguageAnalyzer[]
  ) {}

  analyze(files: File[]) {
    return this.analyzers.flatMap((analyzer) => analyzer.analyze(files));
  }
}
