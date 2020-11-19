import m from 'mithril';
import { MetricsValue } from '../../Entity/MetricsValue';

const levelClassNames = ['is-success', 'is-warning', 'is-danger'];

type Param = MetricsValue;

export class Tag implements m.Component<Param, {}> {
  view(vnode: m.Vnode<Param, {}>) {
    return m(
      '.control',
      m('.tags.has-addons', [
        m('span.tag', String(vnode.attrs.type)),
        m(
          'span.tag',
          {
            className: levelClassNames[vnode.attrs.getLevel()],
          },
          String(vnode.attrs)
        ),
      ])
    );
  }
}
