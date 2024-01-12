import { Router } from 'express';
import multer from 'multer';
import slugify from 'slugify';
import { unlink } from 'fs';
import { promisify } from 'util';
import { uploadFile, getFileStream } from '../utils/s3.js';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware.js';

const ImageRoutes = Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (_, file, cb) {
    cb(null, slugify(file.originalname, { remove: /[*+~()'"!:@]/g }).toLowerCase());
  },
});

const upload = multer({ storage: storage });
const unlinkFile = promisify(unlink);

// Send files to S3
ImageRoutes.post('/upload', ProtectMiddleware, upload.single('image'), async (req, res) => {
  const file = req.file;
  // console.log(file);

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  // console.log(result);

  //TODO: add this directly to DB from here not on front end
  res.send({ imagePath: `/images/${result.Key}` });
});

// Get files from S3
ImageRoutes.get('/images/:key?', (req, res) => {
  const key = req?.params?.key;
  if (!key) {
    res.sendStatus(404);
  }

  const readStream = getFileStream(key);

  readStream.pipe(res);
});

// Redirect old images paths to new
ImageRoutes.get('/content/*', (req, res) => {
  const regex = /\/content\/(.*)\/(.*)\.jpg/g;
  const path = req.path.replace(regex, 'images/$2.webp');

  res
    .writeHead(301, {
      Location: `https://photo.christopherbowers.net/${path}`,
    })
    .end();
});

export { ImageRoutes };
