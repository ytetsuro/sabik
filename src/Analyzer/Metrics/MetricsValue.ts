import { MetricsType } from './MetricsType';

export interface MetricsValue {
  readonly type: MetricsType;
  valueOf(): number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MetricsValueConstructor<T extends MetricsValue = MetricsValue> = new (..._: any) => T;
