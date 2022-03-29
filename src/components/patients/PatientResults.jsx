import React, { useEffect } from 'react';
import { getPatients } from './../../features/patient/patientSlice';
import { useSelector, useDispatch } from 'react-redux';
import PatientItem from './PatientItem';
import Spinner from '../Spinner';

function PatientResults() {

  const dispatch = useDispatch();

  const { patients, loading } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getPatients());
  }, []);

  const handleRefresh = () => {
    dispatch(getPatients());
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
