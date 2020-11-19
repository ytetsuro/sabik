import m from 'mithril';
import { MetricsRow } from '../MetricsRow';
import { Metrics as MetricsEntity } from '../../../Entity/Metrics';

type Param = {
  metrics: MetricsEntity[];
  selectedMetrics: MetricsEntity | null;
  onSelect: (metrics: MetricsEntity) => void;
};

export class Metrics implements m.Component<Param> {
  view(vnode: m.Vnode<Param>) {
    return m(
      '.sabikMetricsMenu',
      vnode.attrs.metrics.map((row) =>
        m(MetricsRow, {
          metrics: row,
          onSelect: () => {
            vnode.attrs.onSelect(row);
          },
          isSelected: vnode.attrs.selectedMetrics === row,
        })
      )
    );
  }
}
