import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3Manager {
  s3Client: any;
  awsS3: any;
  bucketParams: any;

  constructor(keyId: string, accessKey: string, region: string, bucketName: string) {
    const configAwsClient = {
      region: region,
      accessKeyId: keyId,
      secretAccessKey: accessKey,
      apiVersion: '2006-03-01',
      // forcePathStyle : true,
      // endpoint: 'http://localhost:4569',
    };
    this.s3Client = new S3Client(configAwsClient);
    this.bucketParams = {
      Bucket: bucketName,
    };
  }

  async getObjectFile(path: string): Promise<any> {
    try {
      const command = new GetObjectCommand({
        ...this.bucketParams,
        Key: path,
      });
      const response = await this.s3Client.send(command);

      return response;
    } catch (error) {
      console.error('Error al obtener objeto de S3', error);
    }
  }

  async getSignedUrl(path: string): Promise<any> {
    this.bucketParams.Key = path;
    try {
      const command = new GetObjectCommand(this.bucketParams);
      const url = await getSignedUrl(this.s3Client, command, { expiresIn: 604800 });
      return url;
    } catch (error) {
      console.error('Error al obtener objeto de S3', error);
    }
  }

  async uploadFiles(filters: {}): Promise<any> {
    let success = true;
    try {
      var params = {
        ...this.bucketParams,
        ...filters,
      };
      const command = new PutObjectCommand(params);
      const response = await this.s3Client.send(command);
    } catch (err) {
      success = false;
      console.error('Error al subir archivo a S3.', err);
      console.log(err);
    }
    return success;
  }

  public async streamToString(stream: any): Promise<any> {
    const chunks: string[] = [];
    return new Promise((resolve, reject) => {
      stream.setEncoding('utf8');
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(chunks.join('')));
    });
  }
}
