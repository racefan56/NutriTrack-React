import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//get all menuItems
const getMenuItems = async (queryString, token) => {
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
  console.log(menuItem);
  return menuItem;
};

const menuItemService = {
  getMenuItems,
  getMenuItem,
};

export default menuItemService;
