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

//get patient
const getPatient = async (patientId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/patients/${patientId ? patientId : ''}`,
    config
  );

  const patient = await response.data;
  return patient;
};

const patientService = {
  getPatients,
  getPatient,
};

export default patientService;
