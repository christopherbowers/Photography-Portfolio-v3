const Project = require('../models')

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
    const { title } = req.params
    const project = await Project.findOne({ title:  title })
    return res.status(200).json({ project })
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

    images.push(req.body)
    await project.save()
    res.sendStatus(200)
    
  } catch (error) {
    return res.sendStatus(500).send(error.message)
  }
}


/* DELETE
============================================== */

const deleteProject = async (req, res) => {
  try {
    const { title } = req.params
    const project = await Project.findOneAndDelete({ title:  title })
    return res.status(200)
  } 
  catch (error) {
    return res.status(500).send(error.message)
  }
}


module.exports = {
  getAllProjects,
  getProject,
  addImage,
  deleteProject
}