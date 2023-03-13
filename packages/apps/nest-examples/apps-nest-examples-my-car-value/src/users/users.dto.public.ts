import { Expose } from 'class-transformer';

export class UsersDtoPublic {
  @Expose()
  email: string;
}
