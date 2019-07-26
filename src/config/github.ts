import { Config } from "nestjs-config";

export default class Github extends Config {
  auth: string = process.env.GITHUB_AUTH_TOKEN;
  repo: string = process.env.GITHUB_REPO;
  onwer: string = process.env.GITHUB_OWNER;
}
