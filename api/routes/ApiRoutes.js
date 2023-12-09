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

const ApiRoutes = Router();
// const ProtectMiddleware = require('../middleware/ProtectMiddleware');
ApiRoutes.get('/', (req, res) => res.send('✅ API Up'));
ApiRoutes.get('/projects', getProjects);
ApiRoutes.get('/images', getAllImages);

ApiRoutes.delete('/projects/:id', deleteProject);
ApiRoutes.delete('/images/:id', deleteImage);

ApiRoutes.put('/projects/:id', updateProject);

ApiRoutes.post('/projects/', createProject);
ApiRoutes.post('/images/', addImage);

export { ApiRoutes };
