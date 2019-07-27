import { Injectable, Inject } from '@nestjs/common';
import Github from './config/github';
import * as jsonwebtoken from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GithubService {
  private readonly bearer: string;

  constructor(
    @Inject('OctoClient') private readonly OctoClient,
    private readonly githubConfig: Github,
  ) {
    const iat = Math.floor(Date.now() / 1000);

    this.bearer = jsonwebtoken.sign(
      {
        iat,
        exp: iat + 60,
        iss: githubConfig.get('appId'),
      },
      fs.readFileSync(path.resolve(__dirname, '..', githubConfig.get('pem'))),
      {
        algorithm: 'RS256',
      },
    );
  }

  async commentOnIssue(
    issueId: number,
    items: {
      title: string;
      link: string;
    }[],
    owner: string,
    repo: string,
    installationId: number,
  ) {
    let body = '';

    body +=
      'Hey! Stackerbot here!\n\n I searched stackoverflow for your issue and I found these open questions: \n\n';

    items.forEach(item => (body += `[${item.title}](${item.link})\n`));

    // TODO refresh token after expire
    this.OctoClient.authenticate({
      type: 'app',
      token: this.bearer,
    });

    const {
      data: { token },
    } = await this.OctoClient.apps.createInstallationToken({
      installation_id: installationId,
    });

    this.OctoClient.authenticate({
      type: 'token',
      token,
    });

    this.OctoClient.issues.createComment({
      owner,
      repo,
      issue_number: issueId,
      body,
    });
  }
}
