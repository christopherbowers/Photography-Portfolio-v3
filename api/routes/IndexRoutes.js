import { Router } from 'express';
import { getRandomImage } from '../controllers/index.js';

export const IndexRoutes = Router()
  .get('/', async (_, res) => {
    const image = await getRandomImage();
    res.render('home', { pageTitle: 'Home', image: image });
  })

  .get('/', async (_, res) => {
    const image = await getRandomImage();
    res.render('home', { pageTitle: 'Home', image: image });
  })

  .get('/content/*', (req, res) => {
    const regex = /\/content\/(.*)\/(.*)\.jpg/g;
    const path = req.path.replace(regex, 'images/$2.webp');

    res
      .writeHead(301, {
        Location: `https://photo.christopherbowers.net/${path}`,
      })
      .end();
  });
