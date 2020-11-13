import {Metrics as DataModel} from '../DataModel/Metrics';
import {Metrics as Entity} from '../../Entity/Metrics';
import { MetricsValue } from '../../Entity/MetricsValue';
import { MetricsType } from '../../Entity/MetricsType';

export class Metrics {
    to(dataModel: DataModel) {
        return new Entity(dataModel.defineName, [
            new MetricsValue(MetricsType.CongnativeComplexity, dataModel.congnitiveComplexity.complexity),
            new MetricsValue(MetricsType.HalsteadLength, dataModel.halstead.length),
            new MetricsValue(MetricsType.HalsteadDifficulty, dataModel.halstead.difficulty),
            new MetricsValue(MetricsType.HalsteadEffort, dataModel.halstead.effort),
            new MetricsValue(MetricsType.HalsteadTime, dataModel.halstead.time),
            new MetricsValue(MetricsType.HalsteadVocabulary, dataModel.halstead.vocabulary),
            new MetricsValue(MetricsType.HalsteadVolume, dataModel.halstead.volume),
            new MetricsValue(MetricsType.BugsDelivered, dataModel.halstead.bugsDelivered),
            new MetricsValue(MetricsType.LineOfCodeLogical, dataModel.lineOfCode.logical),
            new MetricsValue(MetricsType.LineOfCodePhysical, dataModel.lineOfCode.physical),
            new MetricsValue(MetricsType.Maintainability, dataModel.maintainability.maintainability),
        ], dataModel.position);
    }
}