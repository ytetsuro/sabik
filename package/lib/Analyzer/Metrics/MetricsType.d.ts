export declare class MetricsType {
    private readonly scaler;
    readonly label: string;
    static readonly CognitiveComplexity: MetricsType;
    static readonly HalsteadBugsDelivered: MetricsType;
    static readonly HalsteadVolume: MetricsType;
    static readonly HalsteadLength: MetricsType;
    static readonly HalsteadVocabulary: MetricsType;
    static readonly HalsteadDifficulty: MetricsType;
    static readonly HalsteadEffort: MetricsType;
    static readonly HalsteadTime: MetricsType;
    static readonly LogicalLineOfCode: MetricsType;
    static readonly PhysicalLineOfCode: MetricsType;
    static readonly Maintainability: MetricsType;
    private constructor();
    valueOf(): number;
}
