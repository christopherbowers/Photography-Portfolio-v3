import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
import session from 'express-session';
import {ApiRoutes, AuthRoutes, ImageRoutes, IndexRoutes} from './routes/index.js';
import {errorHandler, notFound} from './middleware/ErrorHandler.js';
import {refreshMenus} from './services/menuService.js';
import db from './db/index.js';
import {create} from 'express-handlebars';

const { NODE_ENV, PORT = 3001, SESSION_SECRET } = process.env;

const app = express();

await refreshMenus(app);

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
app.set('trust proxy', 1); // Behind Caddy; required for a Secure session cookie

const CONTENT_SECURITY_POLICY = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:", // data: for the inline favicon stub in both layouts
  "connect-src 'self'", // Safari has no <link rel=prefetch>; quicklink falls back to fetch/XHR
  "form-action 'self'",
  "base-uri 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join('; ');

app.use((_, res, next) => {
  res.setHeader('Content-Security-Policy', CONTENT_SECURITY_POLICY);
  next();
});

// Admin is off unless explicitly enabled. While off the site is read-only:
// the admin UI, the auth routes (including the unauthenticated /register),
// and every mutating request are 404s. Set ADMIN_ENABLED=true to restore.
const ADMIN_ENABLED = process.env.ADMIN_ENABLED === 'true';

if (!ADMIN_ENABLED) {
  app.use((req, res, next) => {
    const isAdminPath = req.path === '/admin' || req.path.startsWith('/admin/') || req.path.startsWith('/api/auth');
    const isMutating = req.method !== 'GET' && req.method !== 'HEAD';

    if (isAdminPath || isMutating) {
      return res.sendStatus(404); // 404 rather than 403: don't advertise the endpoints
    }

    next();
  });
}

const __dirname = new URL('.', import.meta.url).pathname;
app.use(express.static(path.join(__dirname, '/public/'), { maxAge: '1h' }));

if (ADMIN_ENABLED) {
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: NODE_ENV === 'production', // dev is plain http, where a Secure cookie is never sent
      },
    }),
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.loggedin = req.session?.loggedin;
  next();
});

app.use(logger('dev', { skip: (_, __) => NODE_ENV === 'production' }));
app.use('/', IndexRoutes);
app.use('/api', cors(), ApiRoutes);
app.use('/images', ImageRoutes);
app.use('/api/auth', cors(), AuthRoutes);

app.use(notFound);
app.use(errorHandler);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(PORT, () => {
  console.log(`Express Listening on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
