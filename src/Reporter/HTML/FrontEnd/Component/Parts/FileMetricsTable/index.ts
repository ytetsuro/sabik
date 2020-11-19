import m from 'mithril';
import { FileMetrics } from '../../../Entity/FileMetrics';
import { EventStore } from '../../../Infrastructure/Event/EventStore';
import { GetDashboard } from '../../../Infrastructure/Event/GetDashboard';
import { FileMetricsTable as Presentational } from './FileMetricsTable';

type Param = { list: FileMetrics[] };
type SortableMetrics = 'Complexity' | 'BugsDelivered' | 'Maintainability';

export class FileMetricsTable implements m.Component<Param, {}> {
  private currentSelect: SortableMetrics = 'Complexity';
  private selectableMetrics: SortableMetrics[] = [
    'Complexity',
    'BugsDelivered',
    'Maintainability',
  ];

  oninit() {
    EventStore.get(GetDashboard).dispatch(this.currentSelect);
  }

  view(vnode: m.Vnode<Param, {}>) {
    return m(Presentational, {
      ...vnode.attrs,
      currentSelect: this.currentSelect,
      selectableList: this.selectableMetrics,
      onSelect: (value: string) => {
        this.currentSelect = <SortableMetrics>value;
        EventStore.get(GetDashboard).dispatch(this.currentSelect);
      },
    });
  }
}
