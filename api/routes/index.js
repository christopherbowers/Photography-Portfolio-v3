import { Router } from 'express';
import {
  getProjects,
  addImage,
  getAllImages,
  createProject,
  deleteProject,
  deleteImage,
  updateProject,
} from '../controllers/index.js';

export const routes = Router();
// const ProtectMiddleware = require('../middleware/ProtectMiddleware');
routes.get('/', (req, res) => res.send('✅ API Up'));
routes.get('/projects', getProjects);
routes.get('/images', getAllImages);

routes.delete('/projects/:id', deleteProject);
routes.delete('/images/:id', deleteImage);

routes.put('/projects/:id', updateProject);

routes.post('/projects/', createProject);
routes.post('/images/', addImage);
