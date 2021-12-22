const Project = require('../models/projects')
const Image = require('../models/images')

/* GET
============================================== */
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    return res.status(200).json({ projects })
  } 
  catch (error) {
    return res.status(500).send(error.message)
  }
}

const getProject = async (req, res) => {
  try {
    const { slug } = req.params
    const project = await Project.find({ slug:  slug })
    return res.status(200).json(project)
  } 
  catch (error) {
    return res.status(500).send(error.message)
  }
}


// const getProductById = async (req, res) => {
//   try {
//     const id = req.params.id
//     const products = await Product.findById(id).populate('reviews')
//     return res.status(200).json(products)
//   } catch (error) {
//     return res.status(500).send(error.message)
//   }
// }

const getAllImages = async (req, res) => {
  try {
//     const { slug } = req.params
    const image = await Image.find()
    return res.status(200).json({ image })
  } 
  catch (error) {
    return res.status(500).send(error.message)
  }
}


/* PUT
============================================== */

const addImage = async (req, res) => {
  try {
    const { title } = req.params
    const project = await Project.findOne({ title: title })
    const images = project.image
    
    res.send
//     images.push(req.body)
//     await project.save()
//     res.sendStatus(200)
    
  } catch (error) {
    return res.sendStatus(500).send(error.message)
  }
}

const createProject = async (req, res) => {
  try {
    const project = await new Project(req.body)
    await project.save()
    return res.status(201).json({
      project,
    })
  } catch (error) {
    return res.sendStatus(500).send(error.message)
  }
}


/* DELETE
============================================== */

const deleteProject = async (req, res) => {
  try {
    const { title } = req.params
    await Project.findOneAndDelete({ title:  title })
    return res.sendStatus(200)
  } 
  catch (error) {
    return res.sendStatus(500).send(error.message)
  }
}


module.exports = {
  getAllProjects,
  getAllImages,
  getProject,
  addImage,
  createProject,
  deleteProject
}