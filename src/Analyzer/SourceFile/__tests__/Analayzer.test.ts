import { Analyzer } from '../Analyzer';

describe('Source file analyzer class', () => {
  it('should change to calculatable node then do calculate.', () => {
    const calculator = {
      calculate: jest.fn((calculatableNode) => ({
        dummy: calculatableNode.num + 1,
      })),
    };
    const converter = {
      convert: jest.fn((_) => ({
        num: 1,
      })),
    };
    const analyzer = new Analyzer(calculator, converter);

    const actual = analyzer.analyze({
      isClass: () => false,
      isFauxClass: () => false,
      isFunction: () => false,
      isMethod: () => false,
      getName: () => '',
      getStartLineNumber: () => 0,
      getEndLineNumber: () => 0,
      getChildren: () => [],
    });

    expect(actual.dummy).toBe(2);
    expect(calculator.calculate.mock.calls.length).toBe(1);
    expect(calculator.calculate.mock.calls[0][0]).toStrictEqual({ num: 1 });
    expect(converter.convert.mock.calls.length).toBe(1);
  });
});
