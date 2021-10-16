const appRoot = require('app-root-path')
const multer = require('multer')

const fileController = require(`${appRoot}/src/controllers/FileController.js`)
const INPUT_NAME = 'photos'

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + '-' + (new Date()).toISOString())
  }
})

const fileFilter = (req, file, cb) => {
  if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    cb (null, true)
  } else {
    cb (null, false)
  }
}

const fs = require('fs')

exports.download = (req, res, next) => {
  console.log('fileController.download: started')
  const path = req.body.path
  const file = fs.createReadStream(path)
  const filename = (new Date()).toISOString()
  res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
  file.pipe(res)
}


module.exports = (app) => {
  app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('photo'))
  app.post('/upload', fileController.upload)
  app.post('/download', fileController.download)
}