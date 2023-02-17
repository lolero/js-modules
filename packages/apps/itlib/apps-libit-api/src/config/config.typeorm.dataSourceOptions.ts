import { DataSourceOptions } from 'typeorm';
import { ReportsEntity } from '../modules/reports/reports.entity';
import { UsersEntity } from '../modules/users/users.entity';

type VariableProps = 'type' | 'database';

const configTypeormDataSourceOptionsBase: Omit<
  DataSourceOptions,
  VariableProps
> = {
  entities: [UsersEntity],
  synchronize: false,
  migrations: [`build/migrations/*.js`],
};

let configTypeormDataSourceOptionsVariable: Pick<
  DataSourceOptions,
  VariableProps
> = {
  type: 'sqlite',
  database: 'db-dev.sqlite',
};

switch (process.env.NODE_ENV) {
  case 'dev':
    configTypeormDataSourceOptionsVariable = {
      type: 'sqlite',
      database: 'db-dev.sqlite',
    };
    break;
  case 'test':
    configTypeormDataSourceOptionsVariable = {
      type: 'sqlite',
      database: 'db-test.sqlite',
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
