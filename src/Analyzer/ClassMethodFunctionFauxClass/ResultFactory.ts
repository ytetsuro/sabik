import {CodeMetrics} from './CodeMetrics'

export interface ResultFactory<T, K> {
    create(codeMetricsList: CodeMetrics<T>[]): K;
}
