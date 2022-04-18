import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//get all productionAreas
const getProductionAreas = async (queryString, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/menus/productionAreas?${queryString ? queryString : ''}`,
    config
  );

  const productionAreas = await response.data;
  return productionAreas;
};

//get productionArea
const getProductionArea = async (productionAreaId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/menus/productionAreas/${
      productionAreaId ? productionAreaId : ''
    }`,
    config
  );

  const productionArea = await response.data;
  return productionArea;
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

const productionAreaService = {
  getProductionAreas,
  getProductionArea,
  //   updateMenuItem,
  //   deleteMenuItem,
};

export default productionAreaService;
