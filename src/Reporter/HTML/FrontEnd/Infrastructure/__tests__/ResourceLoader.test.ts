import { ResourceLoader } from "../ResourceLoader";
import {JSDOM} from 'jsdom';

describe('ResourceLoader', () => {
    describe('.load()', () => {
        it('hoge', async () => {
            const jsdom = new JSDOM(`<html><head></head><body></body></html>`);
            const resourceLoader = new ResourceLoader(jsdom.window.document);

            const actual = resourceLoader.load('analyzed', 'analyzed.js');
            jsdom.window.document.dispatchEvent(new jsdom.window.CustomEvent('sabik:resourceLoaded:analyzed', {
                detail: {
                    data: ' eJwLzcssCUktLgEADkUDQQ=='
                }
            }));

            expect(await actual).toBe('UnitTest');
        });
    });
});