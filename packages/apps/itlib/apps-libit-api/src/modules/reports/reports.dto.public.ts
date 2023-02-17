import { Expose, Transform } from 'class-transformer';

export class ReportsDtoPublic {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  mileage: number;

  @Expose()
  isApproved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
