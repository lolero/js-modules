import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { MessagesCreateOneDto } from '../dtos/messages.createOne.dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  messagesGetMany() {
    return this.messagesService.findMany();
  }

  @Get('/:id')
  async messagesGetOne(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }

  @Post()
  messagesCreateOne(@Body() body: MessagesCreateOneDto) {
    return this.messagesService.createOne(body.content);
  }
}
