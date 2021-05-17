import { inject, injectable } from 'inversify';
import { Writer } from '../Writer';

@injectable()
export class HTML {
  constructor(@inject(Writer) private writer: Writer) {}

  async build() {
    return this.writer.write(
      'index.html',
      `<!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8">
            <link rel="stylesheet" href="./app.css">
            <script src="./app.js"></script>
            <title>Sabik Report</title>
            </head>
            <body></body>
         </html>`
    );
  }
}
