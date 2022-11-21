import AWS from 'aws-sdk';

let sqs: AWS.SQS | null = null;

export const makeSQSClient = () => {
  if (!sqs) {
    sqs = new AWS.SQS({
      apiVersion: '2012-11-05',
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: 'eu-central-1',
    });
  }

  return sqs;
};
