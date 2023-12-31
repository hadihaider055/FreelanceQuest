import fs from 'fs'
import { Credentials } from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'

const s3 = new S3({
  region: process.env.REGION || '',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  s3ForcePathStyle: true,
  httpOptions: {
    timeout: 100000,
  },
})

export const generatePresignedURL = async (key: string) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: 60 * 60 * 24 * 365 * 10,
  }

  try {
    const presignedUrl = await s3.getSignedUrlPromise('getObject', params)
    console.log('Presigned URL:', presignedUrl)
    return presignedUrl
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    throw error
  }
}

export interface UploadResponse {
  data: {
    ETag: string
    Location: string
    key: string
    Key: string
    Bucket: string
  }
  publicUrl: string
}

export const uploadFile = async (
  filePath: string,
  fileKey: string,
  metaData?: S3.Metadata,
  oldUrl?: string
): Promise<UploadResponse> => {
  const fileStream = fs.createReadStream(filePath)

  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Body: fileStream,
    Key: fileKey,
    Metadata: metaData,
  }

  if (oldUrl) {
    await deleteFile(oldUrl)
  }

  return new Promise((resolve, reject) => {
    s3.upload(uploadParams, async (err: any, data: any) => {
      if (err) {
        console.log('err', err)
        reject(err)
      } else {
        const publicUrl = generatePublicURL(data.key)
        console.log('data', data, publicUrl)

        resolve({ data, publicUrl })
      }
    })
  })
}

export const generatePublicURL = (key: string): string => {
  const publicURL = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`
  return publicURL
}

export const deleteFile = async (key: string) => {
  const deleteParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  }

  console.log('delete', deleteParams)

  return new Promise((resolve, reject) => {
    s3.deleteObject(deleteParams, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
