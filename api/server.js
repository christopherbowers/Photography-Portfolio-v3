import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import { URL } from 'url';
import {IndexRoutes, ApiRoutes, AuthRoutes, ImageRoutes } from './routes/index.js';
import { notFound, errorHandler } from './middleware/ErrorHandler.js';
import db from './db/index.js';

const { NODE_ENV, PORT = 3001 } = process.env;

const app = express();

const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.use(bodyParser.json());
app.use(logger('dev', { skip: (_, __) => NODE_ENV === 'production' }));
app.use(cors());

app.use('/', IndexRoutes);
app.use('/api', ApiRoutes);
app.use('/images', ImageRoutes);
app.use('/api/auth', AuthRoutes);

app.use(notFound);
app.use(errorHandler);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Express Listening on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
