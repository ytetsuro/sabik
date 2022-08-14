import { injectable } from 'inversify';
import { File } from '../../Analyzer/Adapter/File';
import { Analyzer } from '../../Analyzer/Analyzer';

@injectable()
export abstract class LanguageAnalyzer {
  abstract readonly extensions: string[];

  constructor(private readonly analyzer: Analyzer) {}

  analyze(files: File[]) {
    const analyzableFiles = files.filter((file) => this.extensions.includes(file.extension));
    return this.analyzer.analyze(analyzableFiles);
  }
}
