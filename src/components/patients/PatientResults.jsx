import React, { useContext, useEffect } from 'react';
import PatientItem from './PatientItem';
import PatientContext from '../../context/Patients/PatientsContext';
import Spinner from '../Spinner';

function PatientResults() {
  const { patients, loading, getPatients } = useContext(PatientContext);

  useEffect(() => {
    getPatients();
  }, []);

  const handleRefresh = () => {
    getPatients();
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <button onClick={handleRefresh}>Refresh</button>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Room Number</th>
              <th scope='col'>First</th>
              <th scope='col'>Last</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <PatientItem key={patient.id} patient={patient} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default PatientResults;
