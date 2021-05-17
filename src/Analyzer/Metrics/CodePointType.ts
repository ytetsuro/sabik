import { ASTNode } from '../Adapter/ASTNode';

export class CodePointType {
  public static readonly File = new CodePointType(0);
  public static readonly Class = new CodePointType(1);
  public static readonly FauxClass = new CodePointType(2);
  public static readonly Method = new CodePointType(3);

  private constructor(private readonly scaler: number) {}

  isMoreDetail(codePoint: CodePointType) {
    return this.scaler < codePoint.scaler;
  }

  static castAs(astNode: ASTNode) {
    if (astNode.isClass()) {
      return CodePointType.Class;
    } else if (astNode.isFauxClass()) {
      return CodePointType.FauxClass;
    } else if (astNode.isMethod() || astNode.isFunction()) {
      return CodePointType.Method;
    }

    throw new Error('It is an ASTNode that cannot be cast.');
  }

  valueOf() {
    return this.scaler;
  }
}
