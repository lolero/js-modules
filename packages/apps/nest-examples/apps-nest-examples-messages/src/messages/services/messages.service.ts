import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../repositories/messages.repository';

@Injectable()
export class MessagesService {
  constructor(public messagesRepository: MessagesRepository) {}

  findMany() {
    return this.messagesRepository.findMany();
  }

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  createOne(content: string) {
    return this.messagesRepository.createOne(content);
  }
}
