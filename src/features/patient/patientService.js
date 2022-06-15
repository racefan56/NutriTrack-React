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

//get patient orders
const getPatientOrders = async (queryString, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/patients/allPatientOrders?${queryString ? queryString : ''}`,
    config
  );

  const patients = await response.data;
  return patients;
};

//get one patient order
const getPatientOrder = async (orderId, patientId, token) => {
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(
    `${SERVER}/patients/${patientId}/menu/order/${orderId}`,
    config
  );

  const patientOrder = await response.data;
  return patientOrder;
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

//get patient census report
const getCensus = async (token) => {
  console.log('HERE');
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const response = await axios.get(`${SERVER}/patients/census`, config);

  const patientCensus = await response.data;
  return patientCensus;
};

const patientService = {
  getPatients,
  getPatient,
  getPatientOrders,
  getPatientOrder,
  updatePatient,
  deletePatient,
  createPatient,
  getCensus,
};

export default patientService;
