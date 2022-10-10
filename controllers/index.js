const Project = require('../models/projects');
const Image = require('../models/images');

/* GET
============================================== */
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    return res.status(200).json({ projects });
    //     .populate('image').exec()
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findOne({ slug: id }).populate('image');
    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

/* POST
============================================== */

const addImage = async (req, res) => {
  try {
    const projectId = req.body.project_id;
    const image = await new Image(req.body);
    await image.save();

    const project = await Project.findById(projectId);
    project.image.push(image._id);
    await Project.findByIdAndUpdate(projectId, project);

    return res.status(201).json(image);
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
};

const createProject = async (req, res) => {
  try {
    const project = await new Project(req.body);
    await project.save();
    return res.status(201).json({
      project,
    });
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
};

/* DELETE
============================================== */

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    await Project.findByIdAndDelete(id);
    await Image.deleteMany({ project_id: id });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
};

const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;
    await Image.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await Project.findByIdAndUpdate(id, req.body);

    return res.status(201).json({ project });
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
};

module.exports = {
  getAllProjects,
  getProject,
  addImage,
  getAllImages,
  createProject,
  deleteProject,
  deleteImage,
  updateProject,
};
