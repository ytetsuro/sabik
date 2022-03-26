"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsType = void 0;
class MetricsType {
    constructor(scaler, label) {
        this.scaler = scaler;
        this.label = label;
    }
    valueOf() {
        return this.scaler;
    }
}
exports.MetricsType = MetricsType;
MetricsType.CognitiveComplexity = new MetricsType(0, 'CognitiveComplexity');
MetricsType.HalsteadBugsDelivered = new MetricsType(1, 'HalsteadBugsDelivered');
MetricsType.HalsteadVolume = new MetricsType(2, 'HalsteadVolume');
MetricsType.HalsteadLength = new MetricsType(3, 'HalsteadLength');
MetricsType.HalsteadVocabulary = new MetricsType(4, 'HalsteadVocabulary');
MetricsType.HalsteadDifficulty = new MetricsType(5, 'HalsteadDifficulty');
MetricsType.HalsteadEffort = new MetricsType(6, 'HalsteadEffort');
MetricsType.HalsteadTime = new MetricsType(7, 'HalsteadTime');
MetricsType.LogicalLineOfCode = new MetricsType(8, 'LogicalLineOfCode');
MetricsType.PhysicalLineOfCode = new MetricsType(9, 'PhysicalLineOfCode');
MetricsType.Maintainability = new MetricsType(10, 'Maintainability');
