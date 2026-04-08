import { S3Client } from '@aws-sdk/client-s3';
import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AwsSdkModule } from 'aws-sdk-v3-nest';
import { S3FilesGateway } from './s3Files.gateway';
import { getAwsProviderS3FilesWebSocketGatewayConfig } from './s3Files.providers';
import { S3FilesService } from './s3Files.service';
import { AwsS3FilesConfig } from './s3Files.types';

@Module({})
export class S3FilesModule {
  static registerAsync(awsS3FilesConfig: AwsS3FilesConfig): DynamicModule {
    return {
      module: S3FilesModule,
      global: true,
      imports: [
        MulterModule.register(),
        AwsSdkModule.register({
          client: new S3Client({
            region: awsS3FilesConfig.region,
            credentials: {
              accessKeyId: awsS3FilesConfig.accessKey,
              secretAccessKey: awsS3FilesConfig.accessKeySecret,
            },
          }),
        }),
      ],
      providers: [
        getAwsProviderS3FilesWebSocketGatewayConfig(
          awsS3FilesConfig.webSocketGatewayConfig,
        ),
        S3FilesGateway,
        S3FilesService,
      ],
      exports: [S3FilesService],
    };
  }
}
