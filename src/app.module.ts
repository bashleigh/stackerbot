import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { GithubService } from './github.service';
import * as OctoClient from '@octokit/rest';
import * as path from 'path';
import {ConfigModule} from 'nestjs-config';
import Github from './config/github';

@Module({
  imports: [
    ConfigModule.forRootAsync(path.resolve(__dirname, '*/**/!(*.d).{ts,js}')),
  ],
  controllers: [
    WebhookController,
  ],
  providers: [
    {
      provide: 'OctoClient',
      useFactory: (config: Github) => new OctoClient({
        auth: config.get('auth'),
      }),
    },
    GithubService,
  ],
})
export class AppModule {}
