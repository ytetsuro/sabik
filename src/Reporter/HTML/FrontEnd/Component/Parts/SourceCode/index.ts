import m from 'mithril';
import CodeMirror from 'codemirror';
import 'codemirror/mode/meta';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/php/php';
import { SourceCode as SourceCodeEntity } from '../../../Entity/SourceCode';
import { SourceCode as SourceCodePresenter } from './SourceCode';
import { EventStore } from '../../../Infrastructure/Event/EventStore';
import { SelectMetrics } from '../../../Infrastructure/Event/SelectMetrics';

type Param = {
  sourceCode: SourceCodeEntity;
};

export class SourceCode implements m.Component<Param> {
  private editor?: CodeMirror.EditorFromTextArea;

  oninit() {
    EventStore.get(SelectMetrics).listener((metrics) => {
      if (!this.editor) {
        return;
      }

      const element = document.getElementById('codemirrorStyle')!;

      element.innerText = '';

      if (!metrics) {
        return;
      }

      // @fixme: dirty hack. I was using the addLineClass method of CodeMirror. However, since it is very slow, I decided to edit the style directly.
      element.textContent = `.CodeMirror-code
div:nth-child(n+${metrics.getStartLineNumber()}) ~ div:nth-child(-n+${metrics.getEndLineNumber() + 1})
.CodeMirror-line {background-color: #ffdd57;}`;

      this.editor.scrollIntoView({
        line: metrics.getStartLineNumber(),
        ch: 0,
      });
    });
  }

  oncreate(vnode: m.VnodeDOM<Param>) {
    const { mime } = CodeMirror.findModeByExtension(vnode.attrs.sourceCode.extension);

    this.editor = CodeMirror.fromTextArea(vnode.dom.querySelector('textarea')!, {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      viewportMargin: Infinity,
      mode: mime,
    });
  }

  view(vnode: m.Vnode<Param>) {
    return [m(SourceCodePresenter, vnode.attrs), m('style', { id: 'codemirrorStyle' })];
  }
}
