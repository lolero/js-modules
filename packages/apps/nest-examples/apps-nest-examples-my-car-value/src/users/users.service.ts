import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersServiceType } from '../api-nest-utils/src';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService implements UsersServiceType {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  createOne(email: string, password: string) {
    const userEntity = this.usersRepository.create({ email, password });

    return this.usersRepository.save(userEntity);
  }

  async findOne(id: number) {
    const userEntity = id ? await this.usersRepository.findOneBy({ id }) : null;

    if (!userEntity) {
      throw new NotFoundException('user not found');
    }

    return userEntity;
  }

  findMany(email: string) {
    return this.usersRepository.find({ where: { email } });
  }

  async updateOnePartial(id: number, partialUserEntity: Partial<UsersEntity>) {
    const userEntity = await this.usersRepository.findOneByOrFail({ id });

    if (!userEntity) {
      throw new NotFoundException('user not found');
    }

    Object.assign(userEntity, partialUserEntity);

    return this.usersRepository.save(userEntity);
  }

  async removeOne(id: number) {
    const userEntity = await this.usersRepository.findOneByOrFail({ id });

    if (!userEntity) {
      throw new NotFoundException('user not found');
    }

    return this.usersRepository.remove(userEntity);
  }
}
