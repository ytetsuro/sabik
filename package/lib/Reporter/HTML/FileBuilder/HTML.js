"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const Writer_1 = require("../Writer");
let HTML = class HTML {
    constructor(writer) {
        this.writer = writer;
    }
    async build() {
        return this.writer.write('index.html', `<!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8">
            <link rel="stylesheet" href="./app.css">
            <script src="./app.js"></script>
            <title>Sabik Report</title>
            </head>
            <body></body>
         </html>`);
    }
};
HTML = (0, tslib_1.__decorate)([
    (0, inversify_1.injectable)(),
    (0, tslib_1.__param)(0, (0, inversify_1.inject)(Writer_1.Writer)),
    (0, tslib_1.__metadata)("design:paramtypes", [Writer_1.Writer])
], HTML);
exports.HTML = HTML;
