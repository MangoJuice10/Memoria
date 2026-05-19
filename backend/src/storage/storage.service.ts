import { Injectable } from "@nestjs/common";
import {
  DeleteObjectCommand,
  GetObjectCommand,
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
      endpoint: configService.get("B2_ENDPOINT"),
      region: configService.get("B2_REGION"),
      credentials: {
        accessKeyId: configService.get("B2_APPLICATION_KEY_ID") as string,
        secretAccessKey: configService.get("B2_APPLICATION_KEY_SECRET") as string,
      },
    });
    this.bucket = configService.get("B2_BUCKET_NAME") as string;
    this.publicUrl = configService.get("B2_PUBLIC_URL") as string;
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

  async getPresignedUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });
    return getSignedUrl(this.s3, command, {
      expiresIn: expiresInSeconds,
    });
  }
}
