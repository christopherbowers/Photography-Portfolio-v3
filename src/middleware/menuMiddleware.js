import Project from '../models/projects.js';

const getMenus = async () => {
  try {
    const projects = await Project.find({}).select('title slug').lean();
    const menus = projects.map(({ title, slug, _id }) => {
      return { id: _id, title: title, url: `/projects/${slug}` };
    });
    return { body: menus };
  } catch (error) {
    return { body: [] };
  }
};

let menusData;

const fetchMenus = async () => {
  return await getMenus();
};

const initializeMenus = async () => {
  if (!menusData) {
    menusData = await fetchMenus();
  }
};

const getMenusData = () => {
  return menusData;
};

export { initializeMenus, getMenusData };
