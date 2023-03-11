import { DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  SystemRolesEntity,
  UsersEntity,
} from '@js-modules/apps-nest-examples-users-modules';

type VariableProps =
  | 'type'
  | 'host'
  | 'port'
  | 'username'
  | 'password'
  | 'database';

const configTypeormDataSourceOptionsBase: Omit<
  PostgresConnectionOptions,
  VariableProps
> = {
  entities: [UsersEntity, SystemRolesEntity],
  synchronize: false,
  migrations: [`build/migrations/*.js`],
};

let configTypeormDataSourceOptionsVariable: Pick<
  PostgresConnectionOptions,
  VariableProps
> = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'users',
};

switch (process.env.NODE_ENV) {
  case 'dev':
    break;
  case 'test':
    configTypeormDataSourceOptionsVariable = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'users',
    };
    break;
  case 'prod':
    break;
  default:
    throw new Error(
      'TypeOrm config failed to initialize. Unknown environment!',
    );
}

export const configTypeormDataSourceOptions = {
  ...configTypeormDataSourceOptionsVariable,
  ...configTypeormDataSourceOptionsBase,
} as DataSourceOptions;
