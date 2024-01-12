import Project from '../models/projects.js';
import Image from '../models/images.js';

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

const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;
    await Image.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500).send(error.message);
  }
};

const getMenus = async (_, res) => {
  try {
    const projects = await Project.find({}).select('title slug');
    const menus = projects.map(({ title, slug, _id }) => {
      return { id: _id, title: title, url: `/projects/${slug}` };
    });
    return res.status(200).json({ body: menus });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export { addImage, getAllImages, deleteImage, getMenus };
