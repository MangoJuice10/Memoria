 import { Injectable } from "@nestjs/common";
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "node:crypto";
import { extname } from "path";

@Injectable()
export class StorageService {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      endpoint: configService.get("STORAGE_ENDPOINT"),
      region: configService.get("STORAGE_REGION"),
      credentials: {
        accessKeyId: configService.get("STORAGE_ACCESS_KEY") as string,
        secretAccessKey: configService.get("STORAGE_SECRET_ACCESS_KEY") as string,
      },
      forcePathStyle: true
    });
    this.bucket = configService.get("STORAGE_BUCKET_NAME") as string;
    this.publicUrl = configService.get("STORAGE_PUBLIC_URL") as string;
  }

  async upload(file: Express.Multer.File, folder: string): Promise<string> {
    const key = `${folder}/${randomUUID()}${extname(file.originalname)}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return key;
  }

  async delete(key: string): Promise<void> {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  async copy(sourceKey: string, folder: string): Promise<string> {
    const extension = extname(sourceKey);
    const destinationKey = `${folder}/${randomUUID()}${extension}`;

    await this.s3.send(
      new CopyObjectCommand({
        Bucket: this.bucket,
        CopySource: `${this.bucket}/${sourceKey}`,
        Key: destinationKey,
      }),
    );

    return destinationKey;
  }

  async getPresignedUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return getSignedUrl(this.s3, command, {
      expiresIn: expiresInSeconds,
    });
  }

  async cleanBucket() {
    let continuationToken: string | undefined;

    do {
      const listResponse = await this.s3.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          ContinuationToken: continuationToken,
        }),
      );

      const objects = listResponse?.Contents ?? [];

      if (objects.length > 0) {
        await this.s3.send(
          new DeleteObjectsCommand({
            Bucket: this.bucket,
            Delete: {
              Objects: objects.map(({ Key }) => ({ Key })),
              Quiet: true,
            },
          }),
        );
      }

      continuationToken = listResponse.IsTruncated ? listResponse.NextContinuationToken : undefined;
    } while (continuationToken);
  }
}
