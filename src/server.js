import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import session from 'express-session';
import { IndexRoutes, ApiRoutes, AuthRoutes, ImageRoutes } from './routes/index.js';
import { notFound, errorHandler } from './middleware/ErrorHandler.js';
import { initializeMenus, getMenusData } from './middleware/menuMiddleware.js';
import db from './db/index.js';
import { create } from 'express-handlebars';

const { NODE_ENV, PORT = 3001 } = process.env;

const app = express();
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: './src/views/layouts',
  partialsDir: './src/views/partials',
  helpers: {
    currentYear: () => {
      return new Date().getFullYear();
    },
    eq: (a, b) => {
      return a === b;
    },
  },
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './src/views');
app.set('json spaces', 2); // Pretty print json response

const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(__dirname, '/public/')));

initializeMenus();

app.use(
  session({
    secret: '66WAw7NB',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((_, res, next) => {
  const menusData = getMenusData();
  res.locals.menus = menusData.body;

  next();
});

app.use((req, res, next) => {
  res.locals.loggedin = req.session.loggedin;
  next();
});

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
