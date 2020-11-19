import { Metrics } from './Metrics';
import { FileMetrics as DataModel } from '../DataModel/FileMetrics';
import { FileMetrics as Entity } from '../../Entity/FileMetrics';

export class FileMetrics {
  constructor(private readonly converter: Metrics) {}

  to(dataModel: DataModel) {
    return new Entity(
      dataModel.fileName,
      dataModel.lineOfCode,
      dataModel.metrics.map((row) => this.converter.to(row))
    );
  }
}
