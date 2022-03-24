import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Login user
const loginUser = async (userObj) => {
  const response = await axios.post(`${SERVER}/users/login`, userObj);

  const currentUser = await response.data;
  return currentUser;
};

const authService = {
  loginUser,
};

export default authService;
