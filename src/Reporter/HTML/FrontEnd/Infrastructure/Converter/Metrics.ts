import { FileMetrics as DataModel } from '../DataModel/FileMetrics';
import { Metrics as Entity } from '../../Entity/Metrics';
import { MetricsValue } from './MetricsValue';

export class Metrics {
  constructor(private readonly converter: MetricsValue) {}

  to(dataModel: DataModel) {
    return new Entity(
      dataModel.name,
      dataModel.metricsList.map((row) => this.converter.to(row)),
      {
        start: dataModel.startLineNumber,
        end: dataModel.endLineNumber,
      }
    );
  }
}
