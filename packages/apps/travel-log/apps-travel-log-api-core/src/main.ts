import { NestFactory } from '@nestjs/core';
import { WEB_CLIENT_BASE_URI } from '@js-modules/apps-travel-log-common-constants';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: WEB_CLIENT_BASE_URI,
    },
  });
  await app.listen(3000);
}
bootstrap();
