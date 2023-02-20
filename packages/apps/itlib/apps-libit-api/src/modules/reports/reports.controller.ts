import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsDtoCreateOne } from './reports.dto.createOne';
import { ReportsService } from './reports.service';
import {
  AuthDecoratorCurrentAuthenticatedUser,
  AuthGuardIsUserAuthenticated,
  InterceptorSerialize,
} from '../../libs/api-nest-utils/src';
import {
  UsersEntity,
  UsersGuardIsAdmin,
} from '../../libs/apps-libit-api-nest-modules/src';
import { ReportsDtoPublic } from './reports.dto.public';
import { ReportsEntity } from './reports.entity';
import { ReportsDtoChangeApproval } from './reports.dto.changeApproval';
import { ReportsDtoGetEstimate } from './reports.dto.getEstimate';

@Controller('reports')
@UseGuards(AuthGuardIsUserAuthenticated)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @InterceptorSerialize<ReportsEntity>(ReportsDtoPublic)
  createOne(
    @Body() body: ReportsDtoCreateOne,
    @AuthDecoratorCurrentAuthenticatedUser() user: UsersEntity,
  ) {
    return this.reportsService.createOne(body, user);
  }

  @Patch('/:id')
  @UseGuards(UsersGuardIsAdmin)
  changeApproval(
    @Param('id') id: string,
    @Body() body: ReportsDtoChangeApproval,
  ) {
    return this.reportsService.changeApproval(id, body.isApproved);
  }

  @Get()
  getEstimate(@Query() query: ReportsDtoGetEstimate) {
    return this.reportsService.getEstimate(query);
  }
}
