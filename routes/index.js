const { Router } = require('express')
const controllers = require('../controllers')
const router = Router();

router.get('/projects', controllers.getAllProjects)
router.get('/projects/:slug', controllers.getProject)

router.delete('/projects/:title', controllers.deleteProject)
router.post('/projects/', controllers.createProject)

router.put('/projects/:title', controllers.addImage)



module.exports = router;