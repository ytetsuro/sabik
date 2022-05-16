interface Presenter {
  output(output: string): void;
}

export class FizzBuzz {
  private readonly map = new Map([
    [15, 'FizzBuzz'],
    [3, 'Fizz'],
    [5, 'Buzz'],
  ]);

  constructor(private readonly presenter: Presenter) {}

  public run(input: number) {
    this.presenter.output(this.getResult(input));
  }

  private getResult(input: number) {
    const key = [...this.map.keys()].find((key) => input % key === 0);

    return this.map.get(key) ?? String(input);
  }
}
