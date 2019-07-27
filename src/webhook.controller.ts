import { Controller, Post, Body } from '@nestjs/common';
import { GithubService } from './github.service';
import { StackoverflowService } from './stackoverflow.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly githubService: GithubService,
    private readonly stackoverflowService: StackoverflowService,
  ) {}

  @Post()
  async handleWebhook(@Body() body) {
    if (!body.issue || body.action !== 'opened') {
      return;
    }

    const results = await this.stackoverflowService.findAnswers(
      body.issue.title,
    );

    if (results.length <= 0) {
      return;
    }

    const [owner, repo] = body.repository.full_name.split('/');

    await this.githubService.commentOnIssue(
      body.issue.number,
      results,
      owner,
      repo,
      body.installation.id,
    );
  }
}
