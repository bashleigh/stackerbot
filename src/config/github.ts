import { Config } from 'nestjs-config';

export default class Github extends Config {
  appId: number = parseInt(process.env.GITHUB_APP_ID);
  clientId: string = process.env.GITHUB_CLIENT_ID;
  secret: string = process.env.GITHUB_SECRET;
  pem: string = process.env.GITHUB_PEM;
  owner: string = process.env.GITHUB_OWNER;

  constructor() {
    super({});
  }
}
