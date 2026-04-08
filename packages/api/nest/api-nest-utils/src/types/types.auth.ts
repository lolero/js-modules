import type { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import type { ClassConstructor } from 'class-transformer';

export type AuthModuleMetadata<ServiceT> = {
  module: ClassConstructor<unknown>;
  serviceProvider: FactoryProvider<ServiceT>;
};
