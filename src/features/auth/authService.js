import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Login user
const loginUser = async (userObj) => {
  const response = await axios.post(`${SERVER}/users/login`, userObj);

  const currentUser = await response.data;
  return currentUser;
};

//update user password
const updateUserPassword = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/users/updatePassword`,
    formData,
    config
  );

  const passwordUpdated = await response.data;
  return passwordUpdated;
};

const authService = {
  loginUser,
  updateUserPassword,
};

export default authService;
