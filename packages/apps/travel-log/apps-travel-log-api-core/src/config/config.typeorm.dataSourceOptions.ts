import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { loadEnvConfig } from '@js-modules/common-utils-general-cjs';
import {
  UsersEntity,
  LogEntriesEntity,
} from '@js-modules/apps-travel-log-api-modules-core';

loadEnvConfig();
export const configTypeormDataSourceOptions: PostgresConnectionOptions = {
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
