import AWS from "aws-sdk";

export interface IConvertImage {
  image: {
    ETag: string;
    Location: string;
    Key: string;
    Bucket: string;
    MimeType: string;
  };
}
const generatePreSignedUrl = async (image: any): Promise<string> => {
  return new Promise(function (resolve, reject) {
    try {
      if (image && image.Key && image.Bucket) {
        let keyId = image.Key;
        const s3 = new AWS.S3({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        });
        const params = {
          Bucket: image.Bucket,
          Key: keyId,
        };

        s3.getSignedUrl("getObject", params, function (err, url) {
          resolve(url);
        });
      } else {
        reject("Invalid image");
      }
    } catch (error) {
      reject(error);
    }
  });
};

export default generatePreSignedUrl;
