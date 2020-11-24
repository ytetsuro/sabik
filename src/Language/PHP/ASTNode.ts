import * as PHPParser from 'php-parser';
import { ASTNode as ASTNodeInterface } from '../../Analyzer/Adapter/ASTNode';

type Node = PHPParser.Program|PHPParser.Node|PHPParser.Block;
type IdentifierNode = PHPParser.Node & {name: string};
type StructureNode = PHPParser.Node & {name: IdentifierNode};
type MethodNode = StructureNode & {arguments: StructureNode[]};
type NameExtractableNode = PHPParser.Node & {
  name?: string|IdentifierNode,
  value?: string
};
type EntryNode = PHPParser.Node & {key?: NameExtractableNode};
type AssignNode = PHPParser.Node & {left: NameExtractableNode};

enum Kind {
  CLASS = 'class',
  TRAIT = 'trait',
  METHOD = 'method',
  FUNCTION = 'function',
  CLOSURE = 'closure',
  ALLOW_FUNCTION = 'arrowfunc',
  ENTRY = 'entry',
  ASSIGN = 'assign',
  ARRAY = 'array',
  PROPERTY_LOOKUP = 'propertylookup',
  STATIC_LOOKUP = 'staticlookup',
  LABEL = 'label',
  BIN = 'bin',
  IF = 'if'
};

export class ASTNode implements ASTNodeInterface {
  constructor(
    public readonly node: Node,
    public readonly parentNode?: ASTNode
  ) {}

  get kind() {
    return <Kind>this.node.kind;
  }

  isClass() {
    return [Kind.CLASS, Kind.TRAIT].includes(this.kind);
  }

  isMethod() {
    return this.node.kind === Kind.METHOD;
  }

  getName() {
    let result = '';
    if (this.isClass()) {
      result = this.extractNameString((<StructureNode>this.node).name) ?? 'Anynomus Class';
    } else if (this.isMethod()) {
      const methodName = this.extractNameString((<StructureNode>this.node).name) ?? 'Anynomus Class';
      const params = (<MethodNode>this.node).arguments
        .map(row => this.extractNameString(row))
        .filter(row => row)
        .map(row => `$${row}`);

      result = `${methodName}(${params.join(', ')})`
    } else if (this.isFunction()) {
      return this.getFunctionName(this);
    }

    return result;
  }

  private getFunctionName(node: ASTNode, args: string[] = []): string {
    if (node.node.kind === Kind.FUNCTION) {
      return this.extractNameString(node.node) ?? 'Anonymous Function';
    }

    const currentNode = node?.parentNode?.node;
    switch (currentNode?.kind) {
      case Kind.ARRAY:
        break;
      case Kind.ENTRY:
        args.push(this.extractNameString((<EntryNode>currentNode)?.key) ?? '[]');
        break;
      case Kind.ASSIGN:
        args.push(`$${this.extractNameString((<AssignNode>currentNode)?.left) ?? ''}`);

        return args.reverse().join('.');
      default:
        return 'Anonymous Function';
    }

    return this.getFunctionName(<ASTNode>node.parentNode, args);
  }

  private extractNameString(node?: NameExtractableNode) {
     const name = node?.name ?? node?.value;
     const result = typeof name === 'string' ? name : name?.name ?? null ; 

     if (result !== null) {
       return result;
     } else if ([Kind.PROPERTY_LOOKUP, Kind.STATIC_LOOKUP].includes(<Kind>node?.kind)) {
       return node?.loc.source
        .split('=', 2)[0]
        .replace(/[\n|\r|\s|\t]+/g, '')
        .replace(/(\->|::)/g, '.')
        .replace(/^\$/, '');
     }

     return null;
  }


  isFunction() {
    return [Kind.FUNCTION, Kind.ALLOW_FUNCTION, Kind.CLOSURE].includes(<Kind>this.node.kind);
  }

  isFauxClass() {
    return false;
  }

  getStartLineNumber() {
    return 0;
  }

  getEndLineNumber() {
    return 0;
  }

  getChilds() {
    return [...Object.values(this.node)]
      .filter(row => !!row)
      .flatMap(row => row)
      .filter(row => typeof row === 'object')
      .filter(row => typeof row.kind === 'string')
      .map(row => new ASTNode(row, this));
  }
}
