import React, { useContext } from 'react';
import PatientContext from '../../context/Patients/PatientsContext';
import PatientItem from './PatientItem';

function PatientSearch(queryString) {
  const { getPatients } = useContext(PatientContext);

  //Get patients
  getPatients(queryString);

  return <></>;
}

export default PatientSearch;
