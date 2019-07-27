import { Config } from 'nestjs-config';

export default class StackExchange extends Config {
  key: string = process.env.STACKEXCHANGE_KEY;

  constructor() {
    super({
      version: '2.2',
    });
  }
}
