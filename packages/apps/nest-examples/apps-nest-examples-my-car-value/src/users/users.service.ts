import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private repo: Repository<UsersEntity>,
  ) {}

  createOne(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = id ? await this.repo.findOne({ id }) : null;

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  findMany(email: string) {
    return this.repo.find(email ? { email } : undefined);
  }

  async updateOnePartial(id: number, partialUserEntity: Partial<UsersEntity>) {
    const user = await this.repo.findOneOrFail(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, partialUserEntity);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneOrFail(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }
}
