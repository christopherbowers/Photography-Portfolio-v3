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
    return res.status(200).json({ project })
  } 
  catch (error) {
    return res.status(500).send(error.message)
  }
}


// const addImage = async () => {
//   const { project } = req.params
//   await Project.findOne(project, req.body, (project) => {
// //     return res.status(200).json(project.image)
//     console.log(project)
//   })
// }

module.exports = {
  getAllProjects,
  getProject
//   addImage
}