import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT');

  app.enableCors();
  app.setGlobalPrefix('api');
  app.use(helmet());
  await app.listen(PORT);

  logger.log(`Server started at port ${PORT}`);
}

bootstrap();
