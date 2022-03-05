import { Expose } from 'class-transformer';

export class UsersUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
