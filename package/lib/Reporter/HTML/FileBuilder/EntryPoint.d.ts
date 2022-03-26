import { ScriptBuilder } from '../ScriptBuilder';
import { Writer } from '../Writer';
export declare class EntryPoint {
    private writer;
    private scriptBuilder;
    constructor(writer: Writer, scriptBuilder: ScriptBuilder);
    build(): Promise<void>;
}
