import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/pictures-registers')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.email + '.jpg')
    }
  })

const uploadImg = multer({storage:storage}).single('avatar')

export default uploadImg