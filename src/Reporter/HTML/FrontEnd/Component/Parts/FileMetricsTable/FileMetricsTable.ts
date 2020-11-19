import m from 'mithril';
import { FileMetrics } from '../../../Entity/FileMetrics';
import { Event as CustomEvent } from '../../../Infrastructure/Event/Event';
import { EventStore } from '../../../Infrastructure/Event/EventStore';
import { TableRow } from '../TableRow';

type Param<T extends string> = {
  list: FileMetrics[];
  currentSelect: T;
  selectableList: T[];
  onSelect: (value: T) => void;
};

export class FileMetricsTable<T extends string>
  implements m.Component<Param<T>, {}> {
  view(vnode: m.Vnode<Param<T>, {}>) {
    return [
      m('.columns', [
        m(
          '.column',
          m('.field.is-horizontal', [
            m('.field-label', m('label.label', 'Sort')),
            m(
              '.field-body',
              m(
                '.field',
                m(
                  'p.control',
                  vnode.attrs.selectableList.map((name) =>
                    m('label.radio', [
                      m('input[type="radio"]', {
                        onchange: () => {
                          vnode.attrs.onSelect(name);
                        },
                        checked: vnode.attrs.currentSelect === name,
                      }),
                      name,
                    ])
                  )
                )
              )
            ),
          ])
        ),
      ]),
      m(
        '.columns.table-container',
        m('table.table', [
          m('thead', [
            m('tr', [
              m('th', 'FilePath'),
              m('th', 'CongnitiveComplexity(Max/Avg)'),
              m('th', 'BugsDelivered(Sum/Max)'),
              m('th', 'Maintainability(Min/Avg)'),
              m('th', 'LineOfCode'),
            ]),
          ]),
          m(
            'tbody',
            vnode.attrs.list.map((row) => m(TableRow, row))
          ),
        ])
      ),
    ];
  }
}
