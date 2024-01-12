import dotenv from 'dotenv';
import fs from 'fs';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ID, AWS_KEY } = process.env;

const s3 = new S3Client({
  AWS_BUCKET_REGION,
  AWS_ID,
  AWS_KEY,
});

// uploads a file to s3
export function uploadFile(file) {
  const { path, filename } = file;
  const fileStream = fs.createReadStream(path);

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Body: fileStream,
    Key: filename,
  };

  return s3.upload(uploadParams).promise();
}

// downloads a file from s3
export async function getFileStream(key) {
  const params = {
    Key: key,
    Bucket: AWS_BUCKET_NAME,
  };

  const getObjectCommand = new GetObjectCommand(params);

  const { Body } = await s3.send(getObjectCommand);
  return Body;
}
