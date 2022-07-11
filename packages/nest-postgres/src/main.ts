import { NestFactory } from '@nestjs/core';
import { AppModule } from './home/home.module';
import { PgClient } from './db-config/DBConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3000;

  await PgClient.connect();

  app
    .listen(port)
    .then(() => {
      console.log(`Server running on : ${port}`);
    })
    .catch((err) => {
      console.error('Error', err);
    });
}
bootstrap();
