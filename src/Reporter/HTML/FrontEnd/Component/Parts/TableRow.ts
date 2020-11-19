import m from 'mithril';
import { FileMetrics } from '../../Entity/FileMetrics';

type Param = FileMetrics;

export class TableRow implements m.Component<Param, {}> {
    view(vnode: m.Vnode<Param, {}>) {
        return m('tr', [
            m('td.sabikMetricsFilePath', m(m.route.Link, {
                href: `detail?fileName=${encodeURIComponent(vnode.attrs.fileName)}`,
                title: vnode.attrs.fileName,
            }, vnode.attrs.fileName)),
            m('td', `${vnode.attrs.getMaximumComplexity()}/${vnode.attrs.getAverageComplexity()}`),
            m('td', `${vnode.attrs.getSumBugsDelivered()}/${vnode.attrs.getMaximumBugsDelivered()}`),
            m('td', `${vnode.attrs.getMinimumMaintainability()}/${vnode.attrs.getAverageMaintainability()}`),
            m('td', vnode.attrs.logicalLineOfCode),
        ]);
    }
}