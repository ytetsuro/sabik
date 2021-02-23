import { Metrics as DataModel } from '../DataModel/Metrics';
import { MetricsValue as Entity } from '../../Entity/MetricsValue';
import { MetricsType } from '../../Entity/MetricsType';

export class MetricsValue {
  to(dataModel: DataModel) {
    return new Entity(MetricsType.castAs(dataModel.type), dataModel.value);
  }
}
