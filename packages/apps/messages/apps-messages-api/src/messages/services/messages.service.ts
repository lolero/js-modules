import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../repositories/messages.repository';

@Injectable()
export class MessagesService {
  constructor(public messagesRepository: MessagesRepository) {}

  async findMany() {
    return this.messagesRepository.findMany();
  }

  async findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  async createOne(content: string) {
    return this.messagesRepository.createOne(content);
  }
}
