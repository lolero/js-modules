import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
}
