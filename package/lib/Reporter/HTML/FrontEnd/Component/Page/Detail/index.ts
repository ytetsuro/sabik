import m from 'mithril';
import { Analyzed } from '../../../Infrastructure/Repository/Analyzed';
import { SourceCode as SourceCodeRepository } from '../../../Infrastructure/Repository/SourceCode';
import { Detail as PresnetationalDetail } from '../Detail/Detail';
import { EventStore } from '../../../Infrastructure/Event/EventStore';
import { GetDetail } from '../../../Infrastructure/Event/GetDetail';
import { FileMetrics } from '../../../Entity/FileMetrics';
import { SourceCode } from '../../../Entity/SourceCode';
import { Summary } from '../../../Entity/Summary';

export class Detail implements m.Component {
  private sourceCode?: SourceCode;
  private metrics?: FileMetrics;
  private summary?: Summary;

  constructor(
    private readonly analyzedRepository: Analyzed,
    private readonly sourceCodeRepository: SourceCodeRepository
  ) {}

  oninit() {
    EventStore.register(GetDetail, new GetDetail(this.analyzedRepository, this.sourceCodeRepository));

    EventStore.get(GetDetail).listener((ev) => {
      if (!ev.isExists) {
        m.route.set('/');
        return;
      }

      this.sourceCode = ev.sourceCode;
      this.metrics = <FileMetrics>ev.fileMetrics;
      this.summary = <Summary>ev.summary;
      m.redraw();
    });
    const fileName = decodeURIComponent(m.route.param('fileName'));

    EventStore.get(GetDetail).dispatch(fileName);
  }

  view() {
    return m('div', [
      !!this.metrics &&
        m(PresnetationalDetail, {
          sourceCode: <SourceCode>this.sourceCode,
          fileMetrics: this.metrics,
          summary: <Summary>this.summary,
        }),
    ]);
  }
}
