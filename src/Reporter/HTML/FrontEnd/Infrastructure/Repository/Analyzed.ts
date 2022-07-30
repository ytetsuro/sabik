import { FileMetrics } from '../../Entity/FileMetrics';
import { FileMetrics as Converter } from '../Converter/FileMetrics';
import { FileMetrics as DataModel } from '../DataModel/FileMetrics';
import { ResourceLoader } from '../ResourceLoader';

type SortKey = 'CyclomaticComplexity' | 'CognitiveComplexity' | 'BugsDelivered' | 'Maintainability';

export class Analyzed {
  private fileMetrics: Map<string, FileMetrics> = new Map();
  private isLoaded?: boolean;

  private readonly sortLogics = new Map([
    ['BugsDelivered', this.getDiffBugDelivered],
    ['CyclomaticComplexity', this.getDiffMaximumCyclomaticComplexity],
    ['CognitiveComplexity', this.getDiffMaximumCognitiveComplexity],
    ['Maintainability', this.getDiffMinimumMaintainability],
  ]);

  constructor(private readonly resourceLoader: ResourceLoader, private readonly converter: Converter) {}

  async getByFileName(target: string) {
    return (await this.load()).get(target) ?? null;
  }

  async hasFileName(target: string) {
    return (await this.load()).has(target);
  }

  async getSortedList(sortKey: SortKey) {
    const summaries = (await this.getAll()).filter((row) => row.getLength());
    const sortLogic = this.sortLogics.get(sortKey)!;

    return summaries.sort(sortLogic);
  }

  private getDiffBugDelivered(first: FileMetrics, second: FileMetrics) {
    return Number(second.getSumBugsDelivered()) - Number(first.getSumBugsDelivered());
  }

  private getDiffMaximumCognitiveComplexity(first: FileMetrics, second: FileMetrics) {
    return Number(second.getMaximumCognitiveComplexity()) - Number(first.getMaximumCognitiveComplexity());
  }

  private getDiffMaximumCyclomaticComplexity(first: FileMetrics, second: FileMetrics) {
    return Number(second.getMaximumCyclomaticComplexity()) - Number(first.getMaximumCyclomaticComplexity());
  }

  private getDiffMinimumMaintainability(first: FileMetrics, second: FileMetrics) {
    return Number(first.getMinimumMaintainability()) - Number(second.getMinimumMaintainability());
  }

  private async load() {
    if (!this.isLoaded) {
      const seed = await this.resourceLoader.load('analyzed', 'analyzed');
      const dataModels: DataModel[] = JSON.parse(seed);
      this.fileMetrics = dataModels
        .filter(({ codePointType }) => codePointType === 0)
        .map((row) => ({
          dataModel: row,
          childDataModels: dataModels
            .filter(({ fileName }) => fileName === row.fileName)
            .filter(({ codePointType }) => codePointType !== 0),
        }))
        .map(({ dataModel, childDataModels }) => this.converter.to(dataModel, childDataModels))
        .reduce((map, fileMetrics) => map.set(fileMetrics.fileName, fileMetrics), new Map());

      this.isLoaded = true;
    }

    return this.fileMetrics;
  }

  async getAll() {
    return [...(await this.load()).values()];
  }
}
