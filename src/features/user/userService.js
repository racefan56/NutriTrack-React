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
  console.log(users);
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

//Update user
const updateUser = async (userId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    //  `${SERVER}/users/updateUser/${userId}`,
    `${SERVER}/users/updateUser`,
    formData,
    config
  );

  const user = await response.data;
  return user;
};

//Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(`${SERVER}/users/deleteUser`, config);

  const user = await response.data;
  return user;
};

const userService = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

export default userService;
