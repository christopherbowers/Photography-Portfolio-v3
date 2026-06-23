import Project from '../models/projects.js';

export const refreshMenus = async (app) => {
  try {
    /** @type {Array} */
    const projects = await Project.find({}).select('title slug').lean().exec();
    const menus = projects.map(({ title, slug, _id }) => ({
      id: _id.toString(),
      title,
      url: `/projects/${slug}`
    }));

    if (app) {
      app.locals.menus = menus;
    }
  } catch (error) {
    console.error('CRITICAL: Menu Refresh Failed:', error);
    if (!app.locals.menus) throw error;
  }
};
