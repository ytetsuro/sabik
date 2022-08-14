import m from 'mithril';
import { MetricsValue } from '../../Entity/MetricsValue';
import { SummaryColumn } from './SummaryColumn';

interface SummarySource {
  getAverageCognitiveComplexity(): MetricsValue;
  getAverageCyclomaticComplexity(): MetricsValue;
  getAverageMaintainability(): MetricsValue;
  getSumBugsDelivered(): MetricsValue;
  getTotalLineOfCode(): number;
}

export class Summary implements m.Component<{ summary: SummarySource }> {
  view(vnode: m.Vnode<{ summary: SummarySource }>) {
    return m('.level', [
      m(SummaryColumn, {
        title: 'Cognitive Complexity',
        metrics: vnode.attrs.summary.getAverageCognitiveComplexity(),
      }),
      m(SummaryColumn, {
        title: 'Cyclomatic Complexity',
        metrics: vnode.attrs.summary.getAverageCyclomaticComplexity(),
      }),
      m(SummaryColumn, {
        title: 'Maintainability',
        metrics: vnode.attrs.summary.getAverageMaintainability(),
      }),
      m(SummaryColumn, {
        title: 'Bugs Delivered',
        metrics: vnode.attrs.summary.getSumBugsDelivered(),
      }),
      m(SummaryColumn, {
        title: 'Line Of Code',
        metrics: vnode.attrs.summary.getTotalLineOfCode(),
      }),
    ]);
  }
}
