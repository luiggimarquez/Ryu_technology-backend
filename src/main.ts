import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api');

  await app.listen(8081);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
