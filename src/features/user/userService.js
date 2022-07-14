import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Create user
const createUser = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.post(
    `${SERVER}/users/register`,
    formData,
    config
  );

  const user = await response.data;
  return user;
};

//get all users
const getUsers = async (queryString, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/users?${queryString ? queryString : ''}`,
    config
  );

  const users = await response.data;
  return users;
};

//get user
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/users/${userId ? userId : ''}`,
    config
  );

  const user = await response.data;
  return user;
};

//Update current user
const updateUser = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/users/updateUser`,
    formData,
    config
  );

  const user = await response.data;
  return user;
};

//Update other user
const updateOtherUser = async (userId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/users/updateUser/${userId}`,
    formData,
    config
  );

  const user = await response.data;
  return user;
};

//Delete current user (really just deactivates them)
const deleteUser = async (token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(`${SERVER}/users/deleteUser`, config);

  const user = await response.data;
  return user;
};

//Delete other user (really just deactivates them)
const deleteOtherUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/users/deleteUser/${userId}`,
    [],
    config
  );

  const user = await response.data;
  return user;
};

const userService = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateOtherUser,
  deleteUser,
  deleteOtherUser,
};

export default userService;
