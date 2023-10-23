import path from 'path'
import { cwd } from 'process'

import multer from 'multer'

const acceptedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4']

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const savePath = path.join(cwd(), 'temp_uploads')
      cb(null, savePath)
    },
    filename(req, file, cb) {
      const fileNameArray = file.originalname.split('.')
      const fileExtension = fileNameArray[fileNameArray.length - 1]

      const tempFileName = `${new Date().getTime()}.${fileExtension}`
      cb(null, tempFileName)
    },
  }),
  fileFilter(req, file, cb) {
    const mimeType = file.mimetype
    if (!acceptedMimeTypes.includes(mimeType)) {
      return cb(new Error('File type is not supported'))
    }
    cb(null, true)
  },
  limits: {
    fileSize: 20971520,
  },
})

export default upload
