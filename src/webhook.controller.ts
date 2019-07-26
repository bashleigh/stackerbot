import { Controller, Post, Body } from '@nestjs/common';
import { GithubService } from './github.service';
import { StackoverflowService } from './stackoverflow.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly githubService: GithubService, private readonly stackoverflowService: StackoverflowService) {}

  @Post()
  async handleWebhook(@Body() body) {
    if (body.name !== 'issues' || body.action !== 'created') {
      return;
    }

    const results = await this.stackoverflowService.findAnswers(body.title);

    if (results.length <= 0) {
      return;
    }

    await this.githubService.commentOnIssue(body.issue.id, results);
  }
}
