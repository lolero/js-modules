import {
  // CopyObjectCommand,
  // DeleteObjectCommand,
  // DeleteObjectsCommand,
  GetObjectAclCommandInput,
  GetObjectCommand,
  GetObjectCommandOutput,
  // HeadObjectCommand,
  // ListObjectsV2Command,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectAws } from 'aws-sdk-v3-nest';
import round from 'lodash/round';
import { Socket } from 'socket.io';
import { S3FilesGatewayMetadataDto } from './dtos/s3Files.gatewayMetadata.dto';
import { S3FilesGateway } from './s3Files.gateway';
// import {
//   S3FilesGetObjects,
//   S3FilesMoveFolders,
//   S3FilesMoveObjects,
//   S3FilesRenameObjects,
//   S3FilesSignedUrl,
//   S3FilesUploadFiles,
// } from './s3Files.types';

@Injectable()
export class S3FilesService {
  constructor(
    @InjectAws(S3Client)
    private readonly s3Client: S3Client,
    private readonly s3FilesGateway: S3FilesGateway,
  ) {}

  // async generateSignedURL(
  //   params: GetObjectAclCommandInput,
  //   expiresIn: number,
  // ): Promise<S3FilesSignedUrl> {
  //   try {
  //     const getObjectUrl = await getSignedUrl(
  //       this.s3Client,
  //       new GetObjectCommand(params),
  //       { expiresIn },
  //     );
  //
  //     const currentDate = new Date(
  //       `${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1)
  //         .toString()
  //         .padStart(2, '0')}-${new Date()
  //         .getDate()
  //         .toString()
  //         .padStart(2, '0')}T${new Date()
  //         .getHours()
  //         .toString()
  //         .padStart(2, '0')}:${new Date()
  //         .getMinutes()
  //         .toString()
  //         .padStart(2, '0')}:${new Date()
  //         .getSeconds()
  //         .toString()
  //         .padStart(2, '0')}Z`,
  //     );
  //     const dateSummation = currentDate.getTime() + expiresIn * 1000;
  //     const expirationDate = new Date(dateSummation);
  //
  //     return {
  //       bucket: params.Bucket!,
  //       key: params.Key!,
  //       url: getObjectUrl,
  //       expiresIn: expirationDate.toISOString(),
  //     };
  //   } catch (error) {
  //     return {
  //       bucket: params.Bucket!,
  //       key: params.Key!,
  //       expiresIn: '',
  //     };
  //   }
  // }

  async getFile(
    getObjectAclCommandInput: GetObjectAclCommandInput,
  ): Promise<GetObjectCommandOutput> {
    const getObjectCommandOutput = await this.s3Client.send(
      new GetObjectCommand(getObjectAclCommandInput),
    );

    return getObjectCommandOutput;
  }

  async uploadFile(
    putObjectCommandInput: PutObjectCommandInput,
    file: Express.Multer.File,
    s3FilesGatewayMetadataDto?: S3FilesGatewayMetadataDto,
  ): Promise<void> {
    let socketClient: Socket | undefined;

    if (s3FilesGatewayMetadataDto) {
      socketClient = this.s3FilesGateway.server.sockets.sockets.get(
        s3FilesGatewayMetadataDto.socketClientId,
      );

      if (!socketClient) {
        throw new InternalServerErrorException(
          `Unable to find WebSocket connection for socket client id ${s3FilesGatewayMetadataDto.socketClientId}`,
        );
      }
    }

    if (!file?.buffer) {
      throw new InternalServerErrorException(`Unable to find file`);
    }

    const upload = new Upload({
      client: this.s3Client,
      params: {
        ...putObjectCommandInput,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    if (socketClient) {
      upload.on('httpUploadProgress', (progress) => {
        if (progress.loaded && progress.total) {
          const percentage = round(progress.loaded / progress.total, 2);
          this.s3FilesGateway.emitProgress(
            s3FilesGatewayMetadataDto!.socketClientId,
            {
              percentage,
              processId: s3FilesGatewayMetadataDto!.processId,
            },
          );
        }
      });
    }

    try {
      await upload.done();
    } catch (error) {
      throw new InternalServerErrorException(error, 'Failed to upload file');
    }
  }

  // async renameObjectS3(
  //   { Bucket, newKey, oldKey }: S3FilesRenameObjects,
  //   socketClientId: string,
  // ): Promise<S3FilesResultProcess | undefined> {
  //   try {
  //     if (oldKey.endsWith('/')) {
  //       const { Contents } = await this.s3Client.send(
  //         new ListObjectsV2Command({
  //           Bucket,
  //           Prefix: oldKey,
  //         }),
  //       );
  //       if (!Contents || Contents.length === 0) {
  //         console.log(`❌ No se encontraron archivos en ${oldKey}`);
  //         return;
  //       }
  //       const objectsToMove: S3FilesMoveObjects[] = [];
  //       for (const file of Contents) {
  //         if (file.Key) {
  //           const sourceKey = file.Key;
  //           const destinationKey = sourceKey.replace(oldKey, newKey);
  //           objectsToMove.push({ sourceKey, destinationKey });
  //         }
  //       }
  //
  //       return await this.moveObjects(Bucket, objectsToMove, socketClientId);
  //     }
  //     const result = await this.s3Client.send(
  //       new CopyObjectCommand({
  //         Bucket,
  //         CopySource: `${Bucket}/${oldKey}`,
  //         Key: newKey,
  //       }),
  //     );
  //
  //     await this.s3Client.send(
  //       new DeleteObjectCommand({ Bucket, Key: oldKey }),
  //     );
  //
  //     return { result: true, processId: uuidv4() };
  //   } catch (error) {
  //     console.error('Error al renombrar el objeto: ', error);
  //     return { result: false, processId: uuidv4() };
  //   }
  // }
  //
  // async moveObjects(
  //   bucketName: string,
  //   objects: S3FilesMoveObjects[],
  //   socketClientId: string,
  //   processId: string = uuidv4(),
  // ): Promise<S3FilesResultProcess> {
  //   let result = true;
  //   let count = 1;
  //   for (const obj of objects) {
  //     const { sourceKey, destinationKey } = obj;
  //
  //     try {
  //       // 1️⃣ Copiar el objeto a la nueva ubicación
  //       await this.s3Client.send(
  //         new CopyObjectCommand({
  //           Bucket: bucketName,
  //           CopySource: `${bucketName}/${sourceKey}`,
  //           Key: destinationKey,
  //         }),
  //       );
  //
  //       // 2️⃣ Verificar que la copia existe
  //       await this.s3Client.send(
  //         new HeadObjectCommand({
  //           Bucket: bucketName,
  //           Key: destinationKey,
  //         }),
  //       );
  //
  //       console.log(`✅ Copia verificada: ${sourceKey} → ${destinationKey}`);
  //
  //       // 3️⃣ Si la copia existe, eliminar el original
  //       await this.s3Client.send(
  //         new DeleteObjectCommand({
  //           Bucket: bucketName,
  //           Key: sourceKey,
  //         }),
  //       );
  //
  //       console.log(`🗑️ Eliminado: ${sourceKey}`);
  //       const percentage = Math.round((count / objects.length) * 100);
  //       this.s3FilesGateway.emitProgress(socketClientId, {
  //         objectName: sourceKey,
  //         percentage,
  //         processId,
  //         loading: true,
  //         menssage: '',
  //         notificationType: 'warning',
  //       });
  //       count += 1;
  //     } catch (error) {
  //       console.error(`❌ Error moviendo ${sourceKey}:`, error);
  //       result = false;
  //     }
  //   }
  //
  //   return { result, processId };
  // }
  //
  // async moveFolders(
  //   { bucketName, destinationFolder, sourceFolder }: S3FilesMoveFolders,
  //   socketClientId: string,
  // ): Promise<S3FilesResultProcess | undefined> {
  //   let s3FilesResultProcess: S3FilesResultProcess = {
  //     result: true,
  //     processId: uuidv4(),
  //   };
  //   try {
  //     //* List objects in the origin folder
  //     const { Contents } = await this.s3Client.send(
  //       new ListObjectsV2Command({ Bucket: bucketName, Prefix: sourceFolder }),
  //     );
  //     if (!Contents || Contents.length === 0) {
  //       console.log(`No se encontraron archivos en ${sourceFolder}`);
  //       return;
  //     }
  //
  //     // * Copy and delete objects
  //     const objectsToMove: S3FilesMoveObjects[] = [];
  //     for (const file of Contents) {
  //       if (file.Key) {
  //         const sourceKey = file.Key;
  //         const destinationKey = sourceKey.replace(
  //           sourceFolder,
  //           destinationFolder,
  //         );
  //         objectsToMove.push({ sourceKey, destinationKey });
  //       }
  //     }
  //
  //     s3FilesResultProcess = await this.moveObjects(
  //       bucketName,
  //       objectsToMove,
  //       socketClientId,
  //       s3FilesResultProcess.processId,
  //     );
  //   } catch (error) {
  //     console.error('❌ Error moviendo la carpeta:', error);
  //     s3FilesResultProcess = {
  //       ...s3FilesResultProcess,
  //       result: false,
  //     };
  //   }
  //
  //   return s3FilesResultProcess;
  // }
  //
  // async deleteObjectOrFolder(
  //   bucketName: string,
  //   key: string,
  // ): Promise<boolean> {
  //   try {
  //     if (key.endsWith('/')) {
  //       const result = await this.deleteFolder(bucketName, key);
  //       if (typeof result === 'boolean') {
  //         return result;
  //       }
  //     } else {
  //       return await this.deleteFile(bucketName, key);
  //     }
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }
  //
  // async deleteFolder(
  //   bucketName: string,
  //   folderName: string,
  // ): Promise<boolean | undefined> {
  //   try {
  //     const { Contents } = await this.s3Client.send(
  //       new ListObjectsV2Command({ Bucket: bucketName, Prefix: folderName }),
  //     );
  //     if (!Contents || Contents.length == 0) {
  //       console.log(`✅ La carpeta ${folderName} está vacía o no existe.`);
  //       return;
  //     }
  //     // *Delete All Objects in the folder
  //     await this.s3Client.send(
  //       new DeleteObjectsCommand({
  //         Bucket: bucketName,
  //         Delete: {
  //           Objects: Contents.map((file) => ({ Key: file.Key! })),
  //         },
  //       }),
  //     );
  //
  //     return true;
  //   } catch (error) {
  //     console.error('❌ Error eliminando la carpeta:', error);
  //     return false;
  //   }
  // }
  //
  // async deleteFile(bucketName: string, fileName: string): Promise<boolean> {
  //   try {
  //     await this.s3Client.send(
  //       new DeleteObjectCommand({ Bucket: bucketName, Key: fileName }),
  //     );
  //     return true;
  //   } catch (error) {
  //     console.error(`❌ Error eliminando el archivo ${fileName}:`, error);
  //     return false;
  //   }
  // }
}
