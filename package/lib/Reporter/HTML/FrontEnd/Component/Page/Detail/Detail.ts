import m from 'mithril';
import { SourceCode } from '../../Parts/SourceCode';
import { Metrics } from '../../Parts/Metrics';
import { Summary } from '../../Parts/Summary';
import { FileMetrics } from '../../../Entity/FileMetrics';
import { Summary as SummaryEntity } from '../../../Entity/Summary';
import { SourceCode as SourceCodeEntity } from '../../../Entity/SourceCode';

type Param = {
  fileMetrics: FileMetrics;
  sourceCode: SourceCodeEntity;
  summary: SummaryEntity;
};

export class Detail implements m.Component<Param> {
  view(vnode: m.Vnode<Param>) {
    return m('div.container.is-fullhd', [
      m('section.section', m('.container.is-fullhd', m(Summary, { summary: vnode.attrs.summary }))),
      m('.columns', [
        m(
          '.column.is-one-quarter',
          m(Metrics, {
            metrics: vnode.attrs.fileMetrics.getMetrics(),
          })
        ),
        m('.column', [
          m(SourceCode, {
            sourceCode: vnode.attrs.sourceCode,
          }),
        ]),
      ]),
    ]);
  }
}
