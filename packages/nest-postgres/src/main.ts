import { NestFactory } from '@nestjs/core';
import { AppModule } from './home/home.module';
import { PgClient } from './db-config/DBConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await PgClient.connect();
  await app.listen(3000);
}
bootstrap();
