import AWS from 'aws-sdk'
import stream from 'stream'
import fs from 'fs'
import { IConvertImage } from './generatePreSignedUrl'

interface IUploadSteam {
  fileName: string
  bucket: string
}
const uploadStream = ({ fileName, bucket }: IUploadSteam) => {
  const s3Key = process.env.AWS_ACCESS_KEY_ID
  const s3Secret = process.env.AWS_SECRET_ACCESS_KEY

  const s3 = new AWS.S3({
    accessKeyId: s3Key,
    secretAccessKey: s3Secret,
  })

  const passThrough = new stream.PassThrough()
  const promise = s3
    .upload({
      Bucket: bucket,
      Key: fileName,
      Body: passThrough,
    })
    .promise()
  return { writeStream: passThrough, promise }
}

interface IUploadFileToS3Args {
  path: string
  name: string
}
type IUploadFileToS3Return = {
  key: string
}

const uploadFileToS3 = ({
  path: filePath,
  name: fileName,
}: IUploadFileToS3Args): Promise<IUploadFileToS3Return> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const bucket = process.env.S3_BUCKET
    const readStream = fs.createReadStream(filePath)

    const { writeStream, promise } = uploadStream({
      bucket,
      fileName: fileName.replace(/[' ']/g, '-'),
    })
    readStream.pipe(writeStream)
    try {
      const response = await promise

      resolve({ key: response.Key })
    } catch (error) {
      console.log('error', error.message)
      reject(error)
    }
  })
}

export default uploadFileToS3
