import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Create diet
const createDiet = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.post(`${SERVER}/menus/diets`, formData, config);

  const diet = await response.data;
  return diet;
};

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

//Update diet
const updateDiet = async (dietId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/menus/diets/${dietId}`,
    formData,
    config
  );

  const diet = await response.data;
  return diet;
};

//Delete diet
const deleteDiet = async (dietId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(
    `${SERVER}/menus/diets/${dietId ? dietId : ''}`,
    config
  );

  const diet = await response.data;
  return diet;
};

const dietService = {
  createDiet,
  getDiets,
  getDiet,
  updateDiet,
  deleteDiet,
};

export default dietService;
