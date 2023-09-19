import { DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SystemRolesEntity } from '../modules/systemRoles/systemRoles.entity';
import { UsersEntity } from '../modules/users/users.entity';

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
  case 'development':
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
