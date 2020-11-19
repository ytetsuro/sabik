export abstract class Event<T, Y> {
  private listeners: ((args: Y) => void)[] = [];

  listener(callback: (result: Y) => void) {
    this.listeners.push(callback);
  }

  dispatch(args: T) {
    const result = this.hook(args);

    if (result instanceof Promise) {
      result.then((promiseResult) => this.fire(promiseResult));
      return;
    }

    this.fire(result);
  }

  private fire(args: Y) {
    this.listeners.forEach((callback) => {
      callback(args);
    });
  }

  protected abstract hook(args: T): Promise<Y> | Y;
}
