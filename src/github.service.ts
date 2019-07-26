import {Injectable, Inject} from '@nestjs/common';
import Github from './config/github';

@Injectable()
export class GithubService {
  constructor(@Inject('OctoClient') private readonly OctoClient, private readonly githubConfig: Github) {}

  commentOnIssue(issueId: number, items: {
    title: string;
    link: string;
  }[]) {

    let body = '';

    body += 'Hey! Stackbot here!\n\n I searched stackoverflow for your issue and I found these open questions: \n\n';

    items.forEach(item => body += `[${item.title}](${item.link})\n`);

    this.OctoClient.issues.createComment({
      owner: this.githubConfig.get('owner'),
      repo: this.githubConfig.get('repo'),
      issueId,
      body
    });
  }
}
