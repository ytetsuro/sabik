import { Writer } from '../Writer';
export declare class CSS {
    private writer;
    constructor(writer: Writer);
    build(): Promise<void>;
}
