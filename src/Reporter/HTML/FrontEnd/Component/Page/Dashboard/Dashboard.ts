import m from 'mithril';
import { FileMetrics } from '../../../Entity/FileMetrics';
import { Summary as SummaryEntity } from '../../../Entity/Summary';
import { Summary } from '../../Parts/Summary';
import { FileMetricsTable } from '../../Parts/FileMetricsTable';

type Param = { list: FileMetrics[]; summary: SummaryEntity };

export class Dashboard implements m.Component<Param, {}> {
  view(vnode: m.Vnode<Param, {}>) {
    return m('div', [
      m(
        'section.section',
        m('.container.is-fullhd', m(Summary, { summary: vnode.attrs.summary }))
      ),
      m(
        'section.section',
        m(
          'div.container.is-fullhd',
          m(FileMetricsTable, { list: vnode.attrs.list })
        )
      ),
    ]);
  }
}
