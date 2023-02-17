import { DataSource } from 'typeorm';
import { appConfigTypeormDataSourceOptions } from './app.config.typeormDataSourceOptions';

export const appConfigTypeormDataSource = new DataSource(
  appConfigTypeormDataSourceOptions,
);
