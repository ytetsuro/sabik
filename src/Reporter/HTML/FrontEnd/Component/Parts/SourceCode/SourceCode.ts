import m from 'mithril';
import { SourceCode as SourceCodeEntity } from '../../../Entity/SourceCode';

type Param = {
  sourceCode: SourceCodeEntity;
};

export class SourceCode implements m.Component<Param> {
  view(vnode: m.Vnode<Param>) {
    return m('div', m('textarea', vnode.attrs.sourceCode.sourceCode));
  }
}
