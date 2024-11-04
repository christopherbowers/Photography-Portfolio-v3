import Project from '../models/projects.js';

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
        project = await Project
          .findOne({ slug: name })
          .select('-createdAt -updatedAt')
          .populate('image', 'image_title year image_url');
      }

      if (project) {
        return res.status(200).json(project);
      } else {
        return res.status(200).json([]);
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
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

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    await Image.deleteMany({ project_id: id });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(id, req.body);

    return res.status(201).json({ project });
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
};

const getProject = async (slug) => {
  try {
    const project = await Project.findOne({ slug })
      .select('-createdAt -updatedAt')
      .populate('image', 'image_title year image_url')
      .lean();

    if (project) {
      return { body: project };
    } else {
      return { body: [] };
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export { getProjects, createProject, deleteProject, updateProject, getProject };
