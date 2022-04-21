import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//get all units
const getUnits = async (queryString, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/units?${queryString ? queryString : ''}`,
    config
  );

  const units = await response.data;
  return units;
};

//get unit
const getUnit = async (unitId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/units/${unitId ? unitId : ''}`,
    config
  );

  const unit = await response.data;
  return unit;
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

const unitService = {
  getUnits,
  getUnit,
  //   updateMenuItem,
  //   deleteMenuItem,
};

export default unitService;
