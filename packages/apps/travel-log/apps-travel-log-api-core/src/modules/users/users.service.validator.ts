import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MAX_DATE_MILLISECONDS } from '@js-modules/common-utils-general';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersServiceValidator {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async validateUsername(username: UsersEntity['username']): Promise<boolean> {
    const usersEntity = await this.usersRepository.findOneBy({
      username,
    });

    const isValidUsername = !usersEntity;
    return isValidUsername;
  }

  async validateEmail(email: UsersEntity['email']): Promise<boolean> {
    const usersEntity = await this.usersRepository.findOneBy({
      email,
    });

    const isValidEmail = !usersEntity;
    return isValidEmail;
  }

  async validatePhoneNumber(
    phoneNumber: UsersEntity['phoneNumber'],
  ): Promise<boolean> {
    const usersEntity = await this.usersRepository.findOneBy({
      phoneNumber,
    });

    const isValidPhoneNumber = !usersEntity;
    return isValidPhoneNumber;
  }

  getFilterDateRange(
    from: number | string | null,
    to: number | string | null,
  ): [Date, Date] {
    const dateFrom = new Date(from ?? 0);
    const dateTo = new Date(to ?? MAX_DATE_MILLISECONDS);
    return [dateFrom, dateTo];
  }
}
