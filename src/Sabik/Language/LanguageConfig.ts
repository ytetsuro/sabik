import { LanguageConverter } from '../Analyzer/LanguageConverter'

export interface LanguageConfig extends LanguageConverter
{
    readonly extensions: string[];
}
