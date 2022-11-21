import AWS from 'aws-sdk';

let s3: AWS.S3 | null = null;

export const initS3 = () => {
  if (!s3) {
    s3 = new AWS.S3({
      apiVersion: '2012-11-05',
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: 'eu-central-1',
    });
  }

  return s3;
};
