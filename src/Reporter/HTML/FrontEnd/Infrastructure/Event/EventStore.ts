import { Event } from './Event';

type EventConstructor<T extends Event<any, any>> = new (...args: any) => T;

export class EventStore {
  private static readonly store = new WeakMap();

  static register<T, Y>(
    eventConstructor: EventConstructor<Event<T, Y>>,
    event: Event<T, Y>
  ) {
    EventStore.store.set(eventConstructor, event);
  }

  static get<T extends Event<any, any>>(
    eventConstructor: EventConstructor<T>
  ): T {
    if (!EventStore.store.has(eventConstructor)) {
      EventStore.register(eventConstructor, new eventConstructor());
    }

    return EventStore.store.get(eventConstructor);
  }
}
