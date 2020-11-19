import { Analyzed } from './Analyzer/Analyzed';

export interface Reporter {
  output(metrics: Analyzed[]): Promise<void>;
}
