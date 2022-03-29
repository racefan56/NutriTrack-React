import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//get patients
const getPatients = async (queryString, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/patients?${queryString ? queryString : ''}`,
    config
  );

  const patients = await response.data;
  return patients;
};

const patientService = {
  getPatients,
};

export default patientService;
