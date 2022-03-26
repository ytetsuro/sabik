import { Writer } from '../Writer';
export declare class HTML {
    private writer;
    constructor(writer: Writer);
    build(): Promise<void>;
}
