const Storage = require('@google-cloud/storage');

const BUCKET_NAME = process.env.BUCKET_NAME

const storage = Storage({
  projectId: process.env.PROJECT_NAME,
  keyFilename: process.env.KEYFILE_BUCKET
})

const bucket = storage.bucket(BUCKET_NAME);

urlProjectStorage = (filename) => {
  console.log('INI NAMA FILENAME',filename);
  return `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`
}


const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

const GoogleCloudService = Date.now() + req.file.originalname
const file = bucket.file(GoogleCloudService)

const stream = file.createWriteStream({
  metadata: {
    contentType: req.file.mimetype
  }
})

stream.on('error', (err) => {
  req.file.cloudStorageError = err
  next(err)
})

stream.on('finish', () => {
  req.file.cloudStorageObject = GoogleCloudService
  file.makePublic().then(() => {
    req.file.cloudStoragePublicUrl = urlProjectStorage(GoogleCloudService)
    next()
  })
})
  stream.end(req.file.buffer)
}

const Multer = require('multer'),
       multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
      })

module.exports = {
  urlProjectStorage,
  sendUploadToGCS,
  multer
}
