import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import type { EntityUniqueKeyValue } from '../../../../api-nest-utils/src';
import { InterceptorSerialize } from '../../../../api-nest-utils/src';
import { SystemRolesService } from './systemRoles.service';
import { SystemRolesEntity } from './systemRoles.entity';
import { SystemRolesDtoCreateOne } from './systemRoles.dto.createOne';
import { SystemRolesDtoPublic } from './systemRoles.dto.public';
import { SystemRolesDtoUpdateOnePartial } from './systemRoles.dto.updateOnePartial';
import { SystemRolesDtoDeleteMany } from './systemRoles.dto.deleteMany';
import { SystemRolesDtoUpdateOnePartialWithPattern } from './systemRoles.dto.updateManyPartialWithPattern';
import { SystemRolesDtoFindMany } from './systemRoles.dto.findMany';
import { SystemRolesDtoUpdateOneWhole } from './systemRoles.dto.updateOneWhole';
import type { SystemRolesUniqueKeyName } from './systemRoles.types';
import { UsersGuardIsAdmin } from '../users/users.guard.isAdmin';

// TODO: Update systemRoles' controller and service to adhere to the general
//  pattern followed by users and their updateManyPartial service method
@Controller('systemRoles')
@UseGuards(UsersGuardIsAdmin)
@InterceptorSerialize<SystemRolesEntity>(SystemRolesDtoPublic)
export class SystemRolesController {
  constructor(private systemRolesService: SystemRolesService) {}

  @Post()
  createMany(
    @Body() systemRolesDtoCreateOneArray: SystemRolesDtoCreateOne[],
  ): Promise<SystemRolesEntity[]> {
    return this.systemRolesService.createMany(systemRolesDtoCreateOneArray);
  }

  @Get('/:uniqueKeyValue')
  findOne(
    @Param('uniqueKeyValue') uniqueKeyValue: EntityUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: SystemRolesUniqueKeyName = 'id',
  ): Promise<SystemRolesEntity> {
    return this.systemRolesService.findOne(uniqueKeyName, uniqueKeyValue);
  }

  @Get()
  findMany(@Query() systemRolesDtoFindMany: SystemRolesDtoFindMany) {
    return this.systemRolesService.findMany(systemRolesDtoFindMany);
  }

  @Put()
  updateManyWhole(
    @Body() systemRolesDtoUpdateOneWholeArray: SystemRolesDtoUpdateOneWhole[],
  ): Promise<SystemRolesEntity[]> {
    return this.systemRolesService.updateManyWhole(
      systemRolesDtoUpdateOneWholeArray,
    );
  }

  @Patch('/:id')
  async updateOnePartial(
    @Param('id') id: SystemRolesEntity['id'],
    @Body() systemRolesDtoUpdateOnePartial: SystemRolesDtoUpdateOnePartial,
  ): Promise<SystemRolesEntity> {
    const systemRolesEntities = await this.systemRolesService.updateManyPartial(
      {
        [id]: systemRolesDtoUpdateOnePartial,
      },
    );

    return systemRolesEntities[0];
  }

  @Patch()
  updateManyPartial(
    @Body()
    systemRolesDtoUpdateManyPartialObject: Record<
      SystemRolesEntity['id'],
      SystemRolesDtoUpdateOnePartial
    >,
  ): Promise<SystemRolesEntity[]> {
    return this.systemRolesService.updateManyPartial(
      systemRolesDtoUpdateManyPartialObject,
    );
  }

  @Patch('/pattern')
  updateManyPartialWithPattern(
    @Body()
    systemRolesDtoUpdateOnePartialWithPattern: SystemRolesDtoUpdateOnePartialWithPattern,
  ): Promise<SystemRolesEntity[]> {
    return this.systemRolesService.updateManyPartialWithPattern(
      systemRolesDtoUpdateOnePartialWithPattern,
    );
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: SystemRolesEntity['id']): Promise<void> {
    return this.systemRolesService.deleteMany({ ids: [id] });
  }

  @Delete()
  deleteMany(
    @Body()
    systemRolesDtoDeleteMany: SystemRolesDtoDeleteMany,
  ): Promise<void> {
    return this.systemRolesService.deleteMany(systemRolesDtoDeleteMany);
  }
}
