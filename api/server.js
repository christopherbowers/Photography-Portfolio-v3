import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import { URL } from 'url';
import { ApiRoutes, AuthRoutes, ImageRoutes } from './routes/index.js';
// import { notFound, errorHandler } from './middleware/ErrorHandler.js';
import db from './db/index.js';

const PORT = process.env.PORT || 3001;

const app = express();

const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.use(bodyParser.json());
app.use(logger('dev', { skip: (_, __) => process.env.NODE_ENV === 'production' }));
app.use(cors());

app.use('/api', ApiRoutes);
app.use('', ImageRoutes);
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

app.get('/', (_, res) => {
  //res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`Express Listening on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
