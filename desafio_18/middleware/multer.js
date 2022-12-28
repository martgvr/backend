import multer from "multer";
import path from 'path';

const imageStorage = multer.diskStorage({
    destination: 'views/images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

export const upload = multer({
    storage: imageStorage,
    limits: { fileSize: 100000000 },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
}) 