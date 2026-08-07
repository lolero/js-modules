import type { PostgresDataSourceOptions } from 'typeorm/driver/postgres/PostgresDataSourceOptions';
import {
  LogEntriesEntity,
  UsersEntity,
} from '@js-modules/apps-travel-log-api-modules-core';
import { loadEnvConfig } from '@js-modules/common-utils-general-cjs';

loadEnvConfig();
export const configTypeormDataSourceOptions: PostgresDataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_CORE_HOST,
  port: Number(process.env.DB_CORE_PORT),
  username: process.env.DB_CORE_USERNAME,
  password: process.env.DB_CORE_PASSWORD,
  database: process.env.DB_CORE_DATABASE,
  entities: [UsersEntity, LogEntriesEntity],
  synchronize: false,
  migrations: [`build/migrations/*.js`],
};
