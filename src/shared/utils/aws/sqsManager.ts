import AWS from 'aws-sdk';
import HttpStatusCode from '../../enums/httpStatusCode';
import ErrorCode from '../../error/errorCode';
import Exception from '../../error/Exception';

type MessageAttributes = {
  DataType: string;
  StringValue: string;
};

type Attributes = {
  Title: MessageAttributes;
  Author: MessageAttributes;
  WeeksOn: MessageAttributes;
};

export type SqsMessageParameter = {
  DelaySeconds?: number;
  MessageAttributes?: Attributes;
  MessageBody: string;
  QueueUrl: string;
  MessageDeduplicationId?: string;
  MessageGroupId?: string;
};

export class SqsManager {
  sqsManager: AWS.SQS;

  constructor(region: string) {
    this.sqsManager = new AWS.SQS({
      apiVersion: '2012-11-05',
      region,
    });
  }

  async sendMessage(data: SqsMessageParameter): Promise<any> {
    try {
      return await this.sqsManager.sendMessage(data).promise();
    } catch (error) {
      console.error('Error al enviar mensaje a SQS', error);
      throw new Exception(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0003, []);
    }
  }
}
