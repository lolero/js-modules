import { DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  ProductsEntity,
  UsersEntity,
} from '@js-modules/apps-vending-machine-api-core-modules';

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
  entities: [ProductsEntity, UsersEntity],
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
  database: 'core',
};

switch (process.env.NODE_ENV) {
  case 'development':
    break;
  case 'test':
    configTypeormDataSourceOptionsVariable = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'core',
    };
    break;
  case 'production':
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
