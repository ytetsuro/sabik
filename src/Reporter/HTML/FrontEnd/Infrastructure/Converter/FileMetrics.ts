import { Metrics } from './Metrics';
import { FileMetrics as DataModel } from '../DataModel/FileMetrics';
import { FileMetrics as Entity } from '../../Entity/FileMetrics';

export class FileMetrics {
  constructor(private readonly converter: Metrics) {}

  to(fileMetricsDataModel: DataModel, metricsDataModels: DataModel[]) {
    return new Entity(
      fileMetricsDataModel.fileName,
      this.converter.to(fileMetricsDataModel),
      metricsDataModels.map((row) => this.converter.to(row))
    );
  }
}
