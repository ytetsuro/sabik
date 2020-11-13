export class LineOfCodeCountableNode {
    constructor(private text: string) {
    }

    getText() {
        return this.text;
    }

    getRemovedCommentAndEmptyLineText() {
        return this.text
            .replace(/\/\*[\s\S]*?\*\/|\/\/.*/gm, '')
            .replace(/^\s*$(?:\r\n?|\n)/gm, '');
    }
}