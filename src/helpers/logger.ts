import { appendFileSync, createWriteStream, existsSync } from 'fs'
import { join } from 'path';


export class Logger {
  filePath: string;
  constructor(filePath: string = 'logs.txt') {
    this.filePath = join(__dirname, '../../logs', filePath);
    this.findOrCreateLogFile();
  }

  findOrCreateLogFile() {
    if (!existsSync(this.filePath)) {
      const stream = createWriteStream(this.filePath);
      stream.end();
    }
  };

  log(...varargs: any) {
    try {
      for (let idx in varargs) {

        if (varargs[idx]) {
          let item = varargs[idx];

          if (typeof item === 'object') {
            if (item instanceof Error) {
              item = item.stack;
            } else {
              item = JSON.stringify(item, null, 4);
            }
          }

          if (idx === '0') {
            appendFileSync(this.filePath, `Timestamp: ${new Date().toISOString()}:\n`);
          }

          appendFileSync(this.filePath, `${item}\n`);
          console.log('LOGGER:', item);

          if (idx === (varargs.length - 1).toString()) {
            appendFileSync(this.filePath, `\n\n`);
          }
        }

      }

    } catch (e) {
      console.log('Error in logging', e)
    }
  };
}