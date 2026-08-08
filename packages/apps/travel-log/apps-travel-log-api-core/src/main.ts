import { NestFactory } from '@nestjs/core';
import {
  API_CORE_SERVER__IP__TRAVEL_LOG,
  API_CORE_SERVER__PORT__TRAVEL_LOG,
  WEB_CLIENT__URI__TRAVEL_LOG,
} from '@js-modules/apps-travel-log-common-constants-cjs';
import { loadEnvConfig } from '@js-modules/common-utils-general-cjs';
import { AppModule } from './modules/app/app.module';

loadEnvConfig();
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: WEB_CLIENT__URI__TRAVEL_LOG,
    },
  });
  await app.listen(
    API_CORE_SERVER__PORT__TRAVEL_LOG,
    API_CORE_SERVER__IP__TRAVEL_LOG,
  );
}
void bootstrap();
