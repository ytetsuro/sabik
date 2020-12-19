import m from 'mithril';
import { Metrics } from '../../Entity/Metrics';
import { Tag } from './Tag';

type Params = {
  isSelected: boolean;
  metrics: Metrics;
  onSelect: () => void;
};

export class MetricsRow implements m.Component<Params> {
  view(vnode: m.Vnode<Params>) {
    return m(
      '.card',
      {
        className: vnode.attrs.isSelected ? 'sabikSelectedMetrics' : '',
      },
      [
        m(
          'header.card-header',
          {
            onclick: () => {
              vnode.attrs.onSelect();
            },
          },
          m('div.sabikMetricsCard', [
            m('p.card-header-title.is-size-7', vnode.attrs.metrics.defineName),
            m(
              '.card-header-title.field.is-grouped.is-grouped-multiline.is-size-7',
              vnode.attrs.metrics.getOverview().map((row) => m(Tag, row))
            ),
          ])
        ),
        m(
          '.card-content',
          {
            className: vnode.attrs.isSelected ? '' : 'is-hidden',
          },
          m(
            '.content',
            m(
              '.field.is-grouped.is-grouped-multiline',
              vnode.attrs.metrics.getDetails().map((row) => m(Tag, row))
            )
          )
        ),
      ]
    );
  }
}
