import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//get prepList
const getPrepList = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/patients/generatePrepLists?/${formData.mealPeriod}&day=${formData.day}&productionArea=${formData.productionArea}`,
    config
  );

  const prepList = await response.data;
  return prepList;
};

const prepListService = {
  getPrepList,
};

export default prepListService;
