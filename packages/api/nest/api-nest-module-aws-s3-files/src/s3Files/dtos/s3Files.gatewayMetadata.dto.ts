import { IsString } from 'class-validator';

export class S3FilesGatewayMetadataDto {
  @IsString()
  socketClientId: string;

  @IsString()
  processId: string;
}
