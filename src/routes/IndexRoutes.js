import { Router } from 'express';
import { getRandomImage } from '../controllers/index.js';
import { getProject } from '../controllers/ProjectController.js';

export const IndexRoutes = Router()
  .get('/', async (_, res) => {
    const image = await getRandomImage();

    res.render('home', {pageTitle: 'Home', image: image });
  })

  .get('/projects/:slug', async (req, res) => {
    const project = await getProject(req.params.slug);

    res.render('project', { pageTitle: project.body.title, project: project.body });
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
