import { Inject, Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AWS_S3_FILES_WEB_SOCKET_GATEWAY_CONFIG } from './s3Files.constants';
import { S3FilesProgress } from './s3Files.types';
import type { S3FilesWebSocketGatewayConfig } from './s3Files.types';

@Injectable()
@WebSocketGateway()
export class S3FilesGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(AWS_S3_FILES_WEB_SOCKET_GATEWAY_CONFIG)
    private readonly s3FilesWebSocketGatewayConfig: S3FilesWebSocketGatewayConfig,
  ) {}

  afterInit(server: Server) {
    server.path(this.s3FilesWebSocketGatewayConfig.path);
    server.engine.opts.cors = {
      origin: [this.s3FilesWebSocketGatewayConfig.corsOrigin],
    };
    server.engine.opts.transports = [
      this.s3FilesWebSocketGatewayConfig.transport,
    ];
  }

  handleConnection(socket: Socket) {
    this.server
      .to(socket.id)
      .emit(
        'connect',
        `Client connected to s3 files gateway socket: ${socket.id}`,
      );
  }

  handleDisconnect(socket: Socket) {
    this.server
      .to(socket.id)
      .emit(
        'disconnect',
        `Client disconnected from s3 files gateway socket: ${socket.id}`,
      );
  }

  emitProgress(socketClientId: string, s3FilesProgress: S3FilesProgress) {
    this.server.to(socketClientId).emit('upload-progress', s3FilesProgress);
  }
}
