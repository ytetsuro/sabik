import { FileMetrics } from '../../Entity/FileMetrics';
import { SourceCode as SourceCodeEntity } from '../../Entity/SourceCode';
import { Analyzed } from '../Repository/Analyzed';
import { Event } from './Event';
import { SourceCode } from '../Repository/SourceCode';
import { Summary } from '../../Entity/Summary';

type Result = {
  isExists: boolean;
  fileMetrics: FileMetrics | null;
  summary: Summary | null;
  sourceCode: SourceCodeEntity;
};

export class GetDetail extends Event<string, Result> {
  constructor(
    private readonly analyzedRepository: Analyzed,
    private readonly sourceCodeRepository: SourceCode
  ) {
    super();
  }

  protected async hook(fileName: string) {
    const [isExists, fileMetrics, sourceCode] = await Promise.all([
      this.analyzedRepository.hasFileName(fileName),
      this.analyzedRepository.getByFileName(fileName),
      this.sourceCodeRepository.get(fileName),
    ]);

    return {
      isExists,
      fileMetrics,
      sourceCode,
      summary: new Summary(fileMetrics ? [fileMetrics] : []),
    };
  }
}
