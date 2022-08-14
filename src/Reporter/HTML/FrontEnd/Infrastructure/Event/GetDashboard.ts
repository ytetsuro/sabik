import { Summary } from '../../Entity/Summary';
import { FileMetrics } from '../../Entity/FileMetrics';
import { Analyzed } from '../Repository/Analyzed';
import { Event } from './Event';

type SortKey = 'CognitiveComplexity' | 'CyclomaticComplexity' | 'BugsDelivered' | 'Maintainability';

export class GetDashboard extends Event<SortKey, { summary: Summary; list: FileMetrics[] }> {
  constructor(private readonly repository: Analyzed) {
    super();
  }

  protected async hook(sortKey: SortKey) {
    const list = await this.repository.getSortedList(sortKey);

    return {
      summary: new Summary(list),
      list,
    };
  }
}
