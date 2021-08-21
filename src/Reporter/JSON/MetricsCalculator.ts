import { Decimal } from 'decimal.js';
import { CodePointType } from '../../Analyzer/Metrics/CodePointType';
import { Metrics } from '../../Analyzer/Metrics/Metrics';
import { MetricsValue, MetricsValueConstructor } from '../../Analyzer/Metrics/MetricsValue';

export class MetricsCalculator {
  constructor(private readonly metrics: ReadonlyArray<Metrics>) {}

  filter(minimalCodePointType: CodePointType): MetricsCalculator;
  filter(callback: (metrics: Metrics) => boolean): MetricsCalculator;

  filter(seed: CodePointType | ((metrics: Metrics) => boolean)): MetricsCalculator {
    let callback = seed;

    if (callback instanceof CodePointType) {
      callback = (metrics: Metrics) => metrics.getMinimalCodePoint().type === seed;
    }

    return new MetricsCalculator(this.metrics.filter(callback));
  }

  sum<T extends MetricsValue>(metricsValueConstructor: MetricsValueConstructor<T>): number {
    return this.metrics
      .map((metrics) => metrics.getMetricsByMetricsValue(metricsValueConstructor))
      .filter((metrics) => !!metrics)
      .reduce((sum, metrics) => sum.plus(new Decimal(Number(metrics))), new Decimal(0))
      .toNumber();
  }

  average<T extends MetricsValue>(metricsValueConstructor: MetricsValueConstructor<T>): number {
    return new Decimal(this.sum(metricsValueConstructor))
      .div(this.metrics.filter((metrics) => metrics.hasMetricsValue(metricsValueConstructor)).length)
      .toNumber();
  }

  max<T extends MetricsValue>(identity: MetricsValueConstructor<T>): Metrics {
    return (
      this.metrics
        .filter((metrics) => metrics.hasMetricsValue(identity))
        .reduce((max, metrics) =>
          Number(max?.getMetricsByMetricsValue(identity) ?? -Infinity) >
          Number(metrics.getMetricsByMetricsValue(identity))
            ? max
            : metrics
        ) ?? null
    );
  }

  min<T extends MetricsValue>(identity: MetricsValueConstructor<T>): Metrics {
    return (
      this.metrics
        .filter((metrics) => metrics.hasMetricsValue(identity))
        .reduce((min, metrics) =>
          Number(min?.getMetricsByMetricsValue(identity) ?? Infinity) <
          Number(metrics.getMetricsByMetricsValue(identity))
            ? min
            : metrics
        ) ?? null
    );
  }
}
