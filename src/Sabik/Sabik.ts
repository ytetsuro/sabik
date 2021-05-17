import { FileFinder } from './FileFinder/FileFinder';
import { Reporter } from './Reporter';
import { inject, injectable } from 'inversify';
import { Types } from '../types/Types';
import { Analyzer } from './Analyzer/Analyzer';

@injectable()
export class Sabik {
  constructor(
    private analyzer: Analyzer,
    private fileFinder: FileFinder,
    @inject(Types.reporter) private presenter: Reporter
  ) {}

  exec(findPath: string) {
    const files = this.fileFinder.find(findPath);
    const fileMetricsList = this.analyzer.analyze(files);

    this.presenter.output(fileMetricsList);
  }
}
