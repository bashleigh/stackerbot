import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { GithubService } from './github.service';
import * as OctoClient from '@octokit/rest';
import * as path from 'path';
import { ConfigModule } from 'nestjs-config';
import Github from './config/github';
import { StackoverflowService } from './stackoverflow.service';
import StackExchange from './config/stackexchange';
import * as stackexchange from 'stackexchange';

@Module({
  imports: [
    ConfigModule.forRootAsync(
      path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'),
    ),
  ],
  controllers: [WebhookController],
  providers: [
    {
      provide: 'OctoClient',
      useFactory: (config: Github) => new OctoClient({}),
      inject: [Github],
    },
    {
      provide: 'stackexchange',
      useFactory: (config: StackExchange) =>
        new stackexchange({
          version: config.get('version'),
        }),
      inject: [StackExchange],
    },
    GithubService,
    StackoverflowService,
  ],
})
export class AppModule {}
