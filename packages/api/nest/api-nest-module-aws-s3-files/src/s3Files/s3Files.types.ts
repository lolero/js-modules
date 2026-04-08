import type { S3ClientConfig } from '@aws-sdk/client-s3/dist-types/S3Client';
import type { GatewayMetadata } from '@nestjs/websockets/interfaces/gateway-metadata.interface';

export type S3FilesWebSocketGatewayConfig = {
  path: string;
  corsOrigin: string;
  transport: NonNullable<GatewayMetadata['transports']>[number];
};

export type AwsS3FilesConfig = {
  region: S3ClientConfig['region'];
  accessKey: string;
  accessKeySecret: string;
  webSocketGatewayConfig: S3FilesWebSocketGatewayConfig;
};

export type S3FilesProgress = {
  processId: string;
  percentage: number;
};
