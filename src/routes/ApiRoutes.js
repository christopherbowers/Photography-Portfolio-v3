import { Router } from 'express';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware.js';
import { addImage, getAllImages, deleteImage, getMenus } from '../controllers/index.js';
import { getProjects, createProject, deleteProject, updateProject } from '../controllers/ProjectController.js';

const ApiRoutes = Router();

ApiRoutes.get('/', (_, res) => res.send('✅ API Up'));
ApiRoutes.get('/projects', getProjects);
ApiRoutes.get('/images', getAllImages);
ApiRoutes.get('/menus', getMenus);

ApiRoutes.delete('/projects/:id', ProtectMiddleware, deleteProject);
ApiRoutes.delete('/images/:id', ProtectMiddleware, deleteImage);

ApiRoutes.put('/projects/:id', ProtectMiddleware, updateProject);

ApiRoutes.post('/projects/', ProtectMiddleware, createProject);
ApiRoutes.post('/images/', ProtectMiddleware, addImage);

export { ApiRoutes };
