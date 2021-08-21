type Success = 0;
type Warning = 1;
type Alert = 2;

type Level = Success | Warning | Alert;

export class MetricsType {
  public static readonly CognitiveComplexity = new MetricsType(0, 'CognitiveComplexity', new Map([[8, 2]]));
  public static readonly HalsteadBugsDelivered = new MetricsType(1, 'BugsDelivered', new Map([[2, 2]]));
  public static readonly HalsteadVolume = new MetricsType(2, 'HalsteadVolume');
  public static readonly HalsteadLength = new MetricsType(3, 'HalsteadLength');
  public static readonly HalsteadVocabulary = new MetricsType(4, 'HalsteadVocabulary');
  public static readonly HalsteadDifficulty = new MetricsType(5, 'HalsteadDifficulty');
  public static readonly HalsteadEffort = new MetricsType(6, 'HalsteadEffort');
  public static readonly HalsteadTime = new MetricsType(7, 'HalsteadTime');
  public static readonly LineOfCodeLogical = new MetricsType(
    8,
    'LogicalLineOfCode',
    new Map([
      [21, 1],
      [40, 2],
    ])
  );
  public static readonly LineOfCodePhysical = new MetricsType(9, 'PhysicalLineOfCode');
  public static readonly Maintainability = new MetricsType(
    10,
    'Maintainability',
    new Map([
      [0, 2],
      [40, 1],
      [60, 0],
    ])
  );

  private constructor(
    private readonly scaler: number,
    private readonly metricsName: string,
    private readonly levelThresholds: Map<number, Level> = new Map()
  ) {}

  static castAs(id: number) {
    const result = Object.values(MetricsType)
      .filter((row) => row instanceof MetricsType)
      .find((row: MetricsType) => row.scaler === id);

    if (!result) {
      throw new Error('Unknown metrics types.');
    }

    return result;
  }

  toString() {
    return this.metricsName;
  }

  getLevel(value: number): Level {
    return <Level>(
      [...this.levelThresholds.keys()].reduce(
        (level, limit) => (value >= limit ? this.levelThresholds.get(limit)! : level),
        0
      )
    );
  }
}
