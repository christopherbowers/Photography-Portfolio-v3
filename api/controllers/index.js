import Project from '../models/projects.js';
import Image from '../models/images.js';

/*
 * GET
 */
const getProjects = async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0) {
      const projects = await Project.find({}).select('title slug');
      return res.status(200).json(projects);
    }

    if (req.query) {
      const name = req.query.name;
      let project = await Project.findOne({ slug: name }).select('-createdAt -updatedAt');
      // Only populate image objects if query param is present
      if (Object.keys(req.query).includes('populate')) {
        project = await Project.findOne({ slug: name })
          .select('-createdAt -updatedAt')
          .populate('image', 'image_title year image_url');
      }

      if (project) {
        return res.status(200).json({ project });
      } else {
        return res.status(200).json([]);
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllImages = async (req, res) => {
  try {
    const populated = Object.keys(req.query).includes('populate');
    const random = Object.keys(req.query).includes('random');
    if (random) {
      const image = await Image.aggregate([{ $sample: { size: 1 } }]);
      return res.status(200).json({ image });
    }

    const images = populated
      ? await Image.find().select('-createdAt -updatedAt').populate('project', 'slug title -_id')
      : await Image.find().select('-createdAt -updatedAt  -project');

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

export { getProjects, addImage, getAllImages, createProject, deleteProject, deleteImage, updateProject };
