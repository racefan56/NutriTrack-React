import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Create menu
const createMenu = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.post(`${SERVER}/menus`, formData, config);

  const menu = await response.data;
  return menu;
};

//get all menus
const getMenus = async (queryString, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/menus?${queryString ? queryString : ''}`,
    config
  );

  const menus = await response.data;
  return menus;
};

//get menu
const getMenu = async (menuId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/menus/${menuId ? menuId : ''}`,
    config
  );

  const menu = await response.data;
  return menu;
};

//Update menu
const updateMenu = async (menuId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/menus/${menuId}`,
    formData,
    config
  );

  const menu = await response.data;
  return menu;
};

//Delete menu
const deleteMenu = async (menuId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(
    `${SERVER}/menus/${menuId ? menuId : ''}`,
    config
  );

  const menu = await response.data;
  return menu;
};

const menuService = {
  createMenu,
  getMenus,
  getMenu,
  updateMenu,
  deleteMenu,
};

export default menuService;
