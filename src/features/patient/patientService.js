import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

//Create patient
const createPatient = async (formData, token) => {
  console.log(formData);
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.post(`${SERVER}/patients`, formData, config);

  const patient = await response.data;
  console.log(patient);
  return patient;
};

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
  console.log('GET REQUEST');

  const patient = await response.data;
  return patient;
};

//Update patient
const updatePatient = async (patientId, formData, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.patch(
    `${SERVER}/patients/${patientId}`,
    formData,
    config
  );

  const patient = await response.data;
  return patient;
};

//Delete patient
const deletePatient = async (patientId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.delete(
    `${SERVER}/patients/${patientId ? patientId : ''}`,
    config
  );

  const patient = await response.data;
  return patient;
};

const patientService = {
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  createPatient,
};

export default patientService;
