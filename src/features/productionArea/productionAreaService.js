import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Create production area
const createProductionArea = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.post(
    `${SERVER}/menus/productionAreas`,
    formData,
    config
  );

  const productionArea = await response.data;
  return productionArea;
};

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

//Update production area
const updateProductionArea = async (productionAreaId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/menus/productionAreas/${productionAreaId}`,
    formData,
    config
  );

  const productionArea = await response.data;
  return productionArea;
};

//Delete production area
const deleteProductionArea = async (productionAreaId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(
    `${SERVER}/menus/productionAreas/${
      productionAreaId ? productionAreaId : ''
    }`,
    config
  );

  const productionArea = await response.data;
  return productionArea;
};

const productionAreaService = {
  createProductionArea,
  getProductionAreas,
  getProductionArea,
  updateProductionArea,
  deleteProductionArea,
};

export default productionAreaService;
