import { IsIn } from 'class-validator';

export class UsersDtoDeposit {
  @IsIn([5, 10, 20, 50, 100])
  amount: number;
}
