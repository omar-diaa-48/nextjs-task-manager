import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  
  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  }

  const PORT = `${config.get('server.port')}`;
  await app.listen(PORT);

  logger.log(`App listening on port ${PORT}`)
}
bootstrap();
