import { Router } from 'express';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware.js';
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

ApiRoutes.delete('/projects/:id', ProtectMiddleware, deleteProject);
ApiRoutes.delete('/images/:id', ProtectMiddleware, deleteImage);

ApiRoutes.put('/projects/:id', ProtectMiddleware, updateProject);

ApiRoutes.post('/projects/', ProtectMiddleware, createProject);
ApiRoutes.post('/images/', ProtectMiddleware, addImage);

export { ApiRoutes };
