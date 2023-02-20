import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsEntity } from './reports.entity';
import { ReportsDtoCreateOne } from './reports.dto.createOne';
import { UsersEntity } from '../../libs/apps-libit-api-nest-modules/src';
import { ReportsDtoGetEstimate } from './reports.dto.getEstimate';

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
    // reportsEntity.user = user;

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

  getEstimate({
    make,
    model,
    latitude,
    longitude,
    year,
    mileage,
  }: ReportsDtoGetEstimate) {
    return (
      this.reportsRepository
        .createQueryBuilder()
        .select('AVG(price)', 'price')
        .where('make = :make', { make })
        .andWhere('model = :model', { model })
        .andWhere('model = :model', { model })
        .andWhere('latitude - :latitude BETWEEN -5 AND 5', { latitude })
        .andWhere('longitude - :longitude BETWEEN -5 AND 5', { longitude })
        .andWhere('year - :year BETWEEN -3 AND 3', { year })
        // .andWhere('isApproved IS TRUE', { year })
        .orderBy('ABS(mileage - :mileage)')
        .setParameters({ mileage })
        .limit(3)
        .getRawOne()
    );
  }
}
