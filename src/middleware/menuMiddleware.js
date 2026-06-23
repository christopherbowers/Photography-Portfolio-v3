import {cache} from '../cache.js';
import Project from '../models/projects.js';

export const refreshMenus = async () => {
  try {
    /** @type {Array} */
    const projects = await Project.find({}).select('title slug').lean().exec();
    const menus = projects.map(({ title, slug, _id }) => ({
      id: _id.toString(),
      title,
      url: `/projects/${slug}`
    }));

    cache.set('menus', menus);
  } catch (error) {
    console.error('Could not populate menu cache');

    if (!cache.has('menus')) {
      throw error;
    }
  }
};

await refreshMenus();