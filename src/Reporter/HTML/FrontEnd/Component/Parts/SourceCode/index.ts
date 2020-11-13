import m from 'mithril';
import CodeMirror from 'codemirror';
import 'codemirror/mode/meta';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/php/php';
import { SourceCode as SourceCodeEntity } from '../../../Entity/SourceCode';
import { SourceCode as SourceCodePresenter} from './SourceCode';
import { EventStore } from '../../../Infrastructure/Event/EventStore';
import { SelectMetrics } from '../../../Infrastructure/Event/SelectMetrics';

type Param = {
    sourceCode: SourceCodeEntity
};

export class SourceCode implements m.Component<Param, {}> {
    private editor?: CodeMirror.EditorFromTextArea;
    private selectedLines?: {start: number, end: number};

    oninit() {
        EventStore.get(SelectMetrics).listener((metrics) => {
            if (!this.editor) {
                return;
            }

            this.getLineNumbers().forEach((removeLineNumber) => {
                this.editor!.removeLineClass(removeLineNumber, 'background');
            });
            
            this.selectedLines = metrics ? {
                start: metrics.getStartLineNumber(),
                end: metrics.getEndLineNumber() + 1,
            } : undefined;

            this.getLineNumbers().forEach((addLineNumber) => {
                this.editor!.addLineClass(addLineNumber, 'background', 'sabikSelectedLine');
            });

            if (!metrics) {
                return;
            }

            this.editor.scrollIntoView({
                line: metrics.getStartLineNumber(),
                ch: 0,
            });
        });
    }

    private getLineNumbers() {
        return [...(new Array(this.selectedLines?.end ?? 0)).keys()]
            .slice(this.selectedLines?.start ?? 0);
    }

    oncreate(vnode: m.VnodeDOM<Param, {}>) {
        const {mime} = CodeMirror.findModeByExtension(vnode.attrs.sourceCode.extension);

        this.editor = CodeMirror.fromTextArea(vnode.dom.querySelector('textarea')!, {
            lineNumbers: true,
            lineWrapping: true,
            readOnly: true,
            viewportMargin: Infinity,
            mode: mime
        });
    }

    view(vnode: m.Vnode<Param, {}>) {
        return m(SourceCodePresenter, vnode.attrs);
    }
}