const Project = require('../models')


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
    console.log(decodeURIComponent(title))
    return res.status(200).json({ project })
  } 
  catch (error) {
    return res.status(500).send(error.message)
  }
}

const addImage = async (req, res) => {

const { title } = req.params
const project = await Project.findOne({ title: title })
const images = project.image

images.push(req.body)
await project.save()

console.log(images)
res.send(project)
}



module.exports = {
  getAllProjects,
  getProject,
  addImage
}