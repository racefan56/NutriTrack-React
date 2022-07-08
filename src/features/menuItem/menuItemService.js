import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Create menuItem
const createMenuItem = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.post(
    `${SERVER}/menus/menuItems`,
    formData,
    config
  );

  const menuItem = await response.data;
  return menuItem;
};

//get all menuItems
const getMenuItems = async (queryString, token) => {
  console.log(queryString);
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/menus/menuItems?${queryString ? queryString : ''}`,
    config
  );

  const menuItems = await response.data;
  return menuItems;
};

//get menuItem
const getMenuItem = async (menuItemId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/menus/menuItems/${menuItemId ? menuItemId : ''}`,
    config
  );

  const menuItem = await response.data;
  return menuItem;
};

//Update menuItem
const updateMenuItem = async (menuItemId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/menus/menuItems/${menuItemId}`,
    formData,
    config
  );

  const menuItem = await response.data;
  return menuItem;
};

//Delete menuItem
const deleteMenuItem = async (menuItemId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(
    `${SERVER}/menus/menuItems/${menuItemId ? menuItemId : ''}`,
    config
  );

  const menuItem = await response.data;
  return menuItem;
};

const menuItemService = {
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
  createMenuItem,
};

export default menuItemService;
