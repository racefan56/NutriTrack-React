import React, { useEffect } from 'react';
import { getPatients } from '../../../features/patient/patientSlice';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonMain from '../../layout/Button/ButtonMain/ButtomMain';

import classes from './PatientResults.module.css';

function PatientResults() {
  const dispatch = useDispatch();

  const { patients, loading } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getPatients());
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <ButtonMain text='Refresh' onClick={handleRefresh} />
        <Table headers={['Room', 'First', 'Last', 'Diet', 'Status']}>
          {patients.map((patient) => (
            <TableDataItem
              key={patient._id}
              navigatePath={`/patients/${patient._id}`}
              dataPoints={[
                patient.unit + ' ' + patient.roomNumber.roomNumber,
                patient.firstName,
                patient.lastName,
                patient.currentDiet.name,
                patient.status,
              ]}
            />
          ))}
        </Table>
      </>
    );
  }
}

export default PatientResults;
