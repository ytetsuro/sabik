export class MetricsType {
  public static readonly CognitiveComplexity = new MetricsType(0);
  public static readonly HalsteadBugsDelivered = new MetricsType(1);
  public static readonly HalsteadVolume = new MetricsType(2);
  public static readonly HalsteadLength = new MetricsType(3);
  public static readonly HalsteadVocabulary = new MetricsType(4);
  public static readonly HalsteadDifficulty = new MetricsType(5);
  public static readonly HalsteadEffort = new MetricsType(6);
  public static readonly HalsteadTime = new MetricsType(7);
  public static readonly LogicalLineOfCode = new MetricsType(8);
  public static readonly PhysicalLineOfCode = new MetricsType(9);
  public static readonly Maintainability = new MetricsType(10);

  private constructor(private readonly scaler: number) {}

  valueOf() {
    return this.scaler;
  }
}
