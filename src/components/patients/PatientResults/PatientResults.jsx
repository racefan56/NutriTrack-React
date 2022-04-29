import React, { useEffect } from 'react';
import { getPatients } from '../../../features/patient/patientSlice';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonMain from '../../layout/Button/ButtonMain/ButtonMain';

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

  if (loading || !patients[0]) {
    return <Spinner />;
  } else {
    return (
      <>
        <Table
          headers={['Room', 'First', 'Last', 'Diet', 'Status', '']}
          heading='Patients'
          refresh={handleRefresh}
          createPath='create'
        >
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
            >
              <td>
                <ButtonMain
                  className='m-0'
                  type='Link'
                  path={`${patient._id}`}
                  text='View/Edit'
                />
              </td>
            </TableDataItem>
          ))}
        </Table>
      </>
    );
  }
}

export default PatientResults;
