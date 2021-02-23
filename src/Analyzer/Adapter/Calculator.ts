import { MetricsType } from "../../Calculator/MetricsType";
import { MetricsValue } from "../../Calculator/MetricsValue";

export interface Calculator<T> {
    calculate(source: T): MetricsValue[];
}