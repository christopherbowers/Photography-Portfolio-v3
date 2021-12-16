const { Router } = require('express')
const controllers = require('../controllers')
const router = Router();



router.get('/', (req, res) => res.send('This is root!'))
router.get('/projects', controllers.getAllProjects)
router.get('/projects/:title', controllers.getProject)

router.put('/projects/:title', controllers.addImage)
// router.put('/:title', controllers.addImage)


// 
// router.get('/sides', controllers.getAllSides)
// router.get('/drinks', controllers.getAllDrinks)



module.exports = router;