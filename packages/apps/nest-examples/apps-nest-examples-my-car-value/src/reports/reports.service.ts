import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsEntity } from './reports.entity';
import { ReportsDtoCreateOne } from './reports.dto.createOne';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportsEntity)
    private reportsRepository: Repository<ReportsEntity>,
  ) {}

  createOne(
    reportsDtoCreateOne: ReportsDtoCreateOne,
    user: UsersEntity,
  ): Promise<ReportsEntity> {
    const reportsEntity = this.reportsRepository.create(reportsDtoCreateOne);
    reportsEntity.user = user;

    return this.reportsRepository.save(reportsEntity);
  }

  async changeApproval(id: string, isApproved: boolean) {
    const reportsEntity = await this.reportsRepository.findOne({
      where: {
        id,
      },
    });

    if (!reportsEntity) {
      throw new NotFoundException('report not found');
    }

    reportsEntity.isApproved = isApproved;

    return this.reportsRepository.save(reportsEntity);
  }
}
