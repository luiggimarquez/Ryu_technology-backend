import multer from 'multer'

const storageUsers = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/pictures-registers')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.email + '.jpg')
    }
  }) 

  
const storageProducts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, 'temporal.jpg')
  }
})

const uploadImgUsers = multer({storage:storageUsers}).single('avatar')
const uploadImgProducts = multer({storage:storageProducts}).single('imgProduct')



export { uploadImgProducts , uploadImgUsers}