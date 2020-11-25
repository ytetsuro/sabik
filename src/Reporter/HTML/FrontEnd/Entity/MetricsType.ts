type Success = 0;
type Warning = 1;
type Alert = 2;

type Level = Success | Warning | Alert;

export class MetricsType {
  public static readonly CognitiveComplexity = new MetricsType(
    'CognitiveComplexity',
    new Map([[8, 2]])
  );
  public static readonly BugsDelivered = new MetricsType(
    'BugsDelivered',
    new Map([[2, 2]])
  );
  public static readonly Maintainability = new MetricsType(
    'Maintainability',
    new Map([
      [0, 2],
      [40, 1],
      [60, 0],
    ])
  );
  public static readonly HalsteadVolume = new MetricsType('HalsteadVolume');
  public static readonly HalsteadLength = new MetricsType('HalsteadLength');
  public static readonly HalsteadVocabulary = new MetricsType(
    'HalsteadVocabulary'
  );
  public static readonly HalsteadDifficulty = new MetricsType(
    'HalsteadDifficulty'
  );
  public static readonly HalsteadEffort = new MetricsType('HalsteadEffort');
  public static readonly HalsteadTime = new MetricsType('HalsteadTime');
  public static readonly LineOfCodeLogical = new MetricsType(
    'LogicalLineOfCode',
    new Map([
      [21, 1],
      [40, 2],
    ])
  );
  public static readonly LineOfCodePhysical = new MetricsType(
    'PhysicalLineOfCode'
  );

  private constructor(
    private readonly scaler: string,
    private readonly levelThresholds: Map<number, Level> = new Map()
  ) {}

  toString() {
    return this.scaler;
  }

  getLevel(value: number): Level {
    return <Level>(
      [...this.levelThresholds.keys()].reduce(
        (level, limit) =>
          value >= limit ? this.levelThresholds.get(limit)! : level,
        0
      )
    );
  }
}
