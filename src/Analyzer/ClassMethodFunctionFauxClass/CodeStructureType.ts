export class CodeStructureType {
  public static readonly CLASS = new CodeStructureType(1);

  public static readonly FAUX_CLASS = new CodeStructureType(2);

  public static readonly METHOD = new CodeStructureType(3);

  private constructor(private scaler: number) {}

  public isClass() {
    return [CodeStructureType.CLASS, CodeStructureType.FAUX_CLASS].includes(
      this
    );
  }

  valueOf() {
    return this.scaler;
  }
}
