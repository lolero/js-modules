import { IsBoolean } from 'class-validator';

export class ReportsDtoChangeApproval {
  @IsBoolean()
  isApproved: boolean;
}
