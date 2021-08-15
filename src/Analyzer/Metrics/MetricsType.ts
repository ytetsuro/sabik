export class MetricsType {
  public static readonly CognitiveComplexity = new MetricsType(0, 'CognitiveComplexity');
  public static readonly HalsteadBugsDelivered = new MetricsType(1, 'HalsteadBugsDelivered');
  public static readonly HalsteadVolume = new MetricsType(2, 'HalsteadVolume');
  public static readonly HalsteadLength = new MetricsType(3, 'HalsteadLength');
  public static readonly HalsteadVocabulary = new MetricsType(4, 'HalsteadVocabulary');
  public static readonly HalsteadDifficulty = new MetricsType(5, 'HalsteadDifficulty');
  public static readonly HalsteadEffort = new MetricsType(6, 'HalsteadEffort');
  public static readonly HalsteadTime = new MetricsType(7, 'HalsteadTime');
  public static readonly LogicalLineOfCode = new MetricsType(8, 'LogicalLineOfCode');
  public static readonly PhysicalLineOfCode = new MetricsType(9, 'PhysicalLineOfCode');
  public static readonly Maintainability = new MetricsType(10, 'Maintainability');

  private constructor(private readonly scaler: number, public readonly label: string) {}

  valueOf() {
    return this.scaler;
  }
}
