import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemRolesController } from './systemRoles.controller';
import { SystemRolesEntity } from './systemRoles.entity';
import { SystemRolesService } from './systemRoles.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemRolesEntity])],
  controllers: [SystemRolesController],
  providers: [SystemRolesService],
  exports: [SystemRolesService],
})
export class SystemRolesModule {}
