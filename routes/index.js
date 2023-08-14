const { Router } = require('express')
const controllers = require('../controllers')
const router = Router()
// const ProtectMiddleware = require('../middleware/ProtectMiddleware');

router.get('/projects', controllers.getProjects)
router.get('/images', controllers.getAllImages)

router.delete('/projects/:id', controllers.deleteProject)
router.delete('/images/:id', controllers.deleteImage)

router.put('/projects/:id', controllers.updateProject)

router.post('/projects/', controllers.createProject)
router.post('/images/', controllers.addImage)

module.exports = router
