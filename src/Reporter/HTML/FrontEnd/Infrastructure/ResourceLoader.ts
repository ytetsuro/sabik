import Pako from 'pako';

export interface EventData{
    data: string
}

export class ResourceLoader {
    constructor(private document: Document) {
    }

    async load(type: 'analyzed'|'sourceCode', filePath: string) {
        const rawSourceCode = new Promise<string>((resolve) => {
            const eventHandler = (event: Event) => {
                this.document.removeEventListener(`sabik:resourceLoaded:${type}`, eventHandler);
                resolve((<CustomEvent<EventData>>event).detail.data);
            };

            this.document.addEventListener(`sabik:resourceLoaded:${type}`, eventHandler);
            this.injectFile(filePath);
        });

        const data = new Uint8Array(
            atob(await rawSourceCode)
            .split('')
            .map(x => x.charCodeAt(0))
        );

        return Pako.inflate(data, {to: 'string'});
    }

    private injectFile(filePath: string) {
        const script = this.document.createElement('script');
        script.setAttribute('src', `./event/${filePath}.js`);
        script.addEventListener('load', () => {
            script.remove();
        });

        this.document.body.appendChild(script);
    }
}