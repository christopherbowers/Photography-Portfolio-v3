import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import multer from 'multer';
import slugify from 'slugify';
import { unlink } from 'fs';
import { promisify } from 'util';
import { URL } from 'url';
import { routes } from './routes/index.js';
import { AuthRoutes } from './routes/AuthRoutes.js';
// import { notFound, errorHandler } from './middleware/ErrorHandler.js';
import { uploadFile, getFileStream } from './controllers/s3.js';
import db from './db/index.js';

const unlinkFile = promisify(unlink);

const PORT = process.env.PORT || 3001;

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, slugify(file.originalname, { remove: /[*+~()'"!:@]/g }).toLowerCase());
  },
});

const upload = multer({ storage: storage });

const app = express();

const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.use(bodyParser.json());
app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'production' }));
app.use(cors());

// Send files to S3
app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  // console.log(file);

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  // console.log(result);
  res.send({ imagePath: `/images/${result.Key}` });
});

// Get files from S3
app.get('/images/:key', (req, res) => {
  // console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.use('/api', routes);
app.use('/api/auth', AuthRoutes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/content/*', (req, res) => {
  const regex = /\/content\/(.*)\/(.*)\.jpg/g;
  const path = req.path.replace(regex, 'images/$2.webp');

  res
    .writeHead(301, {
      Location: `https://photo.christopherbowers.net/${path}`,
    })
    .end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Express Listening on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
