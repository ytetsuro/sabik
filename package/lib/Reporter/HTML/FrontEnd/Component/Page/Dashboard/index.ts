import m from 'mithril';
import { Dashboard as DashboardPresentational } from './Dashboard';
import { GetDashboard } from '../../../Infrastructure/Event/GetDashboard';
import { Analyzed } from '../../../Infrastructure/Repository/Analyzed';
import { EventStore } from '../../../Infrastructure/Event/EventStore';
import { Summary } from '../../../Entity/Summary';
import { FileMetrics } from '../../../Entity/FileMetrics';

export class Dashboard implements m.Component {
  private summary?: Summary;
  private list: FileMetrics[] = [];

  constructor(private readonly repository: Analyzed) {}

  oninit() {
    EventStore.register(GetDashboard, new GetDashboard(this.repository));

    EventStore.get(GetDashboard).listener((ev) => {
      this.summary = ev.summary;
      this.list = ev.list;
      m.redraw();
    });
  }

  view() {
    return m(DashboardPresentational, {
      summary: this.summary ?? new Summary([]),
      list: this.list,
    });
  }
}
