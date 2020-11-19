import m from 'mithril';
import { MetricsValue } from '../../Entity/MetricsValue';

type Param = { title: string; metrics: MetricsValue | number; link?: string };

export class SummaryColumn implements m.Component<Param, {}> {
  view(vnode: m.Vnode<Param, {}>) {
    return m(
      '.level-item.has-text-centered',
      m('div', [
        m('p.heading', vnode.attrs.title),
        m('p.title', Number(vnode.attrs.metrics)),
      ])
    );
  }
}
