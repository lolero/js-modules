import { IsString } from 'class-validator';

export class MessagesCreateOneDto {
  @IsString()
  content: string;
}
