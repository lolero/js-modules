import { NestFactory } from '@nestjs/core';
import {
  API_CORE_IP_TRAVEL_LOG,
  API_CORE_PORT_TRAVEL_LOG,
  WEB_CLIENT_URI_TRAVEL_LOG,
} from '@js-modules/apps-travel-log-common-constants-cjs';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: WEB_CLIENT_URI_TRAVEL_LOG,
    },
  });
  await app.listen(API_CORE_PORT_TRAVEL_LOG, API_CORE_IP_TRAVEL_LOG);
}
bootstrap();
