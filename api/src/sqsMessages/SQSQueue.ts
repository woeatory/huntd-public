import AWS from 'aws-sdk';
import { SendMessageResult } from 'aws-sdk/clients/sqs';
import { Logger } from '@mate-academy/core';
import {
  Queue,
  QueueEmitOptions,
  QueueEvents,
} from '@/core/queue';
import { makeSQSClient } from '@/sqsMessages/makeSQSClient';
import { queueEventSQSURLMap } from '@/sqsMessages/queueEventSQSURLMap';

const DEFAULT_EMIT_OPTIONS: QueueEmitOptions = {
  log: false,
};

export class SQSQueue extends Queue {
  private static instance: SQSQueue;

  private client: AWS.SQS;

  constructor(logger: Logger) {
    super(logger);

    if (!SQSQueue.instance) {
      this.client = makeSQSClient();

      SQSQueue.instance = this;
    }

    return SQSQueue.instance;
  }

  async add(
    event: QueueEvents,
    {
      log = DEFAULT_EMIT_OPTIONS.log,
    } = DEFAULT_EMIT_OPTIONS,
  ): Promise<SendMessageResult> {
    const queueUrl = queueEventSQSURLMap[event.type];

    try {
      const result = await this.client
        .sendMessage({
          MessageBody: JSON.stringify(event.payload),
          QueueUrl: queueUrl,
        })
        .promise();

      if (log) {
        this.logger.info(
          `SQS REQUEST ${event.type} SUCCEEDED`,
          { MessageId: result.MessageId, ...event.payload },
        );
      }

      return result;
    } catch (error) {
      this.logger.error(
        `SQS REQUEST ${event.type} ERROR`,
        error.message || error,
        event.payload,
      );

      return {};
    }
  }
}
