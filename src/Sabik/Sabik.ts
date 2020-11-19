import 'core-js/features/array';
import { FileFinder } from './FileFinder/FileFinder';
import { Reporter } from './Reporter';
import { AnalyzerMap } from './AnalyzerMap';
import { AnalyzerMapCollectingParamter } from './Language/AnalyzerMapCollectingParamter';
import { inject, injectable } from 'inversify';
import { Types } from '../types/Types';

@injectable()
export class Sabik {
  private analyzerMap: AnalyzerMap;

  constructor(
    analyzerMap: AnalyzerMap,
    private fileFinder: FileFinder,
    @inject(Types.reporter) private presenter: Reporter
  ) {
    this.analyzerMap = AnalyzerMapCollectingParamter.build(analyzerMap);
  }

  exec(findPath: string) {
    const paths = this.fileFinder.find(findPath);

    const fileMetricsList = paths
      .filter((path) => this.analyzerMap.has(path.extension))
      .map((path) => this.analyzerMap.get(path.extension)!.analyze(path));

    this.presenter.output(fileMetricsList);
  }
}
