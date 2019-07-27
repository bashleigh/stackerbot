import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(express.static(path.join(__dirname, '/../public')));
  app.setBaseViewsDir(path.resolve(__dirname, '../views'));
  app.setViewEngine('pug');

  await app.listen(3000);
}
bootstrap();
