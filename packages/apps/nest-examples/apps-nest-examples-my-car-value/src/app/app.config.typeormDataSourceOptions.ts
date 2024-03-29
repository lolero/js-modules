import { DataSourceOptions } from 'typeorm';
import { ReportsEntity } from '../reports/reports.entity';
import { UsersEntity } from '../users/users.entity';

type VariableProps = 'type' | 'database';

const appConfigTypeormDataSourceBaseOptions: Omit<
  DataSourceOptions,
  VariableProps
> = {
  entities: [ReportsEntity, UsersEntity],
  synchronize: true,
  migrations: ['migrations/*.js'],
};

let appConfigTypeormDataSourceOptionsVariable: Pick<
  DataSourceOptions,
  VariableProps
> = {
  type: 'sqlite',
  database: 'db-dev.sqlite',
};

switch (process.env.NODE_ENV) {
  case 'development':
    appConfigTypeormDataSourceOptionsVariable = {
      type: 'sqlite',
      database: 'db-dev.sqlite',
    };
    break;
  case 'test':
    appConfigTypeormDataSourceOptionsVariable = {
      type: 'sqlite',
      database: 'db-test.sqlite',
    };
    break;
  case 'production':
    break;
  default:
    throw new Error(
      'TypeOrm config failed to initialize. Unknown environment!',
    );
}

export const appConfigTypeormDataSourceOptions = {
  ...appConfigTypeormDataSourceOptionsVariable,
  ...appConfigTypeormDataSourceBaseOptions,
} as DataSourceOptions;
