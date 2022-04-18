import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//get all diets
const getDiets = async (queryString, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/menus/diets?${queryString ? queryString : ''}`,
    config
  );

  const diets = await response.data;
  return diets;
};

//get diet
const getDiet = async (dietId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/menus/diets/${dietId ? dietId : ''}`,
    config
  );

  const diet = await response.data;
  return diet;
};

// //Update menuItem
// const updateMenuItem = async (menuItemId, formData, token) => {
//   const config = {
//     headers: {
//       Authorization: `${token}`,
//     },
//   };

//   const response = await axios.patch(
//     `${SERVER}/menus/menuItems/${menuItemId}`,
//     formData,
//     config
//   );

//   const menuItem = await response.data;
//   return menuItem;
// };

// //Delete menuItem
// const deleteMenuItem = async (menuItemId, token) => {
//   const config = {
//     headers: {
//       Authorization: `${token}`,
//     },
//   };

//   const response = await axios.delete(
//     `${SERVER}/menus/menuItems/${menuItemId ? menuItemId : ''}`,
//     config
//   );

//   const menuItem = await response.data;
//   return menuItem;
// };

const dietService = {
  getDiets,
  getDiet,
  //   updateMenuItem,
  //   deleteMenuItem,
};

export default dietService;
