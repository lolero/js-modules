import type { Provider } from '@nestjs/common';
import { AWS_S3_FILES_WEB_SOCKET_GATEWAY_CONFIG } from './s3Files.constants';
import type { S3FilesWebSocketGatewayConfig } from './s3Files.types';

export function getAwsProviderS3FilesWebSocketGatewayConfig(
  s3FilesWebSocketGatewayConfig: S3FilesWebSocketGatewayConfig,
): Provider {
  return {
    provide: AWS_S3_FILES_WEB_SOCKET_GATEWAY_CONFIG,
    useValue: s3FilesWebSocketGatewayConfig,
  };
}
