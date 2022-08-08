import { Logger } from '../interface/Logger';

export class ConsoleLogger implements Logger {
  log(message: string, value = ''): void {
    console.log(message, value);
  }
}
