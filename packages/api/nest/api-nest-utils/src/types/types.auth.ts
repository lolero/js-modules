import { ClassConstructor } from 'class-transformer';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';

export type AuthModuleMetadata<ServiceT> = {
  module: ClassConstructor<any>;
  serviceProvider: FactoryProvider<ServiceT>;
};
