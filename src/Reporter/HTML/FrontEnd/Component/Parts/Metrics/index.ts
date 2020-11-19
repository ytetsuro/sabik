import m from 'mithril';
import { Metrics as MetricsEntity } from '../../../Entity/Metrics';
import { EventStore } from '../../../Infrastructure/Event/EventStore';
import { SelectMetrics } from '../../../Infrastructure/Event/SelectMetrics';
import { Metrics as Presentational } from './Metrics';

type Param = {
  metrics: MetricsEntity[];
};

export class Metrics implements m.Component<Param, {}> {
  private selectedMetrics: MetricsEntity | null = null;

  constructor() {
    EventStore.get(SelectMetrics).listener((metrics) => {
      this.selectedMetrics = metrics;
      m.redraw();
    });
  }

  view(vnode: m.Vnode<Param, {}>) {
    return m(Presentational, {
      metrics: vnode.attrs.metrics,
      selectedMetrics: this.selectedMetrics,
      onSelect: (metrics) => {
        EventStore.get(SelectMetrics).dispatch(
          this.selectedMetrics === metrics ? null : metrics
        );
      },
    });
  }
}
