import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Create unit
const createUnit = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.post(`${SERVER}/units`, formData, config);

  const unit = await response.data;
  return unit;
};

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

//Update unit
const updateUnit = async (unitId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/units/${unitId}`,
    formData,
    config
  );

  const unit = await response.data;
  return unit;
};

//Delete unit
const deleteUnit = async (unitId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(
    `${SERVER}/units/${unitId ? unitId : ''}`,
    config
  );

  const unit = await response.data;
  return unit;
};

const unitService = {
  createUnit,
  getUnits,
  getUnit,
  updateUnit,
  deleteUnit,
};

export default unitService;
