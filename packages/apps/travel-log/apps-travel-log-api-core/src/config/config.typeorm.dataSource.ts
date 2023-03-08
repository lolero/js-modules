import { DataSource } from 'typeorm';
import { configTypeormDataSourceOptions } from './config.typeorm.dataSourceOptions';

export const configTypeormDataSource = new DataSource(
  configTypeormDataSourceOptions,
);
