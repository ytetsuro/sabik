import { Event } from './Event';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventConstructor<T extends Event<any, any>> = new (...args: any) => T;

export class EventStore {
  private static readonly store = new WeakMap();

  static register<T, Y>(eventConstructor: EventConstructor<Event<T, Y>>, event: Event<T, Y>) {
    EventStore.store.set(eventConstructor, event);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static get<T extends Event<any, any>>(eventConstructor: EventConstructor<T>): T {
    if (!EventStore.store.has(eventConstructor)) {
      EventStore.register(eventConstructor, new eventConstructor());
    }

    return EventStore.store.get(eventConstructor);
  }
}
