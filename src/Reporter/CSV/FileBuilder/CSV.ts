import { inject, injectable } from 'inversify';
import { CodePointType } from '../../../Analyzer/Metrics/CodePointType';
import { Metrics } from '../../../Analyzer/Metrics/Metrics';
import { FileBuilder } from '../../FileBuilder';
import { Writer } from '../../Writer';

@injectable()
export class CSV implements FileBuilder {
  constructor(@inject(Writer) private writer: Writer) {}

  async build(metrics: Metrics[]): Promise<void> {
    const csvRows = this.generateCSVRows(metrics);
    const csvRaw = csvRows.map((row) => `"${row.join('","')}"`).join('\n');
    const byteOrderMark = '\ufeff';

    this.writer.write('metrics.csv', `${byteOrderMark}${csvRaw}`);
  }

  private generateCSVRows(metrics: Metrics[]) {
    const methodMetrics = metrics.filter((row) => row.getMinimalCodePoint().type === CodePointType.Method);

    const analyzedMetricsNames = new Set(
      methodMetrics.flatMap(({ metricsValues }) => metricsValues.map(({ type }) => type.label))
    );
    const header = ['name', 'fullPath', ...analyzedMetricsNames.values()];
    const body = methodMetrics
      .map(
        (row) =>
          <{ [key: string]: string }>{
            name: row.getName(),
            fullPath: row.file.fullPath,
            ...row.metricsValues.reduce(
              (metricsValues, metricsValue) => ({
                ...metricsValues,
                [metricsValue.type.label]: String(Number(metricsValue)),
              }),
              {}
            ),
          }
      )
      .map((row) => header.map((columnName) => (row[columnName] ?? '').replace(/"/g, '""')));

    return [header, ...body];
  }
}
