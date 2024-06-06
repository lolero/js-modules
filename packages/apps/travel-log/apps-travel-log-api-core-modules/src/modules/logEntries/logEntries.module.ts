import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntriesController } from './logEntries.controller';
import { LogEntriesEntity } from './logEntries.entity';
import { LogEntriesService } from './logEntries.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntriesEntity])],
  controllers: [LogEntriesController],
  providers: [LogEntriesService],
  exports: [LogEntriesService],
})
export class LogEntriesModule {}
