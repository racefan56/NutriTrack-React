import React, { useState, useEffect } from 'react';
import { getPatients } from '../../../features/patient/patientSlice';
import { getUnits } from '../../../features/unit/unitSlice';
import { useSelector, useDispatch } from 'react-redux';
import Table from '../../layout/Table/Table';
import TableDataItem from '../../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../../Spinner/Spinner';
import ButtonMain from '../../layout/Button/ButtonMain/ButtonMain';
import NoResults from '../../NoResults/NoResults';
import Error from '../../Error/Error';

import classes from './PatientResults.module.css';

function PatientResults() {
  const dispatch = useDispatch();

  const { patients, loading, isError } = useSelector((state) => state.patient);

  const { units } = useSelector((state) => state.unit);

  const [formData, setFormData] = useState({
    unit: '',
    status: '',
  });
  const [unitValuesLabels, setUnitValuesLabels] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { unit, status } = formData;

  useEffect(() => {
    dispatch(getUnits());
    dispatch(getPatients());
  }, [dispatch]);

  useEffect(() => {
    if (units) {
      const data = units.map((unit) => {
        return { value: unit.unitName, label: unit.unitName };
      });
      data.unshift({ value: '', label: 'All' });
      setUnitValuesLabels(data);
    }
  }, [units]);

  const handleReset = () => {
    console.log(formData);
    if (
      formData.unit !== '' || formData.status !== ''
    ) {
      setFormData({
        unit: '',
        status: '',
      });
      dispatch(getPatients());
    }
  };

  const handleRefresh = ({ limitChange }) => {
    let string = '';

    if (limitChange) {
      string = `limit=${limitChange}`;
    } else {
      string = `limit=${limit}`;
    }

    if (unit !== '') {
      string = `${string + `&unit=${unit}`}`;
    }
    if (status !== '') {
      string = `${string + `&status=${status}`}`;
    }
    return dispatch(getPatients(string));
  };

  const handleChange = (e) => {
    const key = e.target.id;
    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    handleRefresh({ limitChange: e.target.value });
  };

  const filterOptions = {
    unit: unitValuesLabels,
    status: [
      { value: '', label: 'All' },
      { value: 'NPO', label: 'NPO' },
      { value: 'Eating', label: 'Eating' },
    ],
  };

  if (loading || !units) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          tableId='patientResultsTable'
          headers={['Room', 'First', 'Last', 'Diet', 'Status', '']}
          heading='Patients'
          refresh={handleRefresh}
          createPath='create'
          filterHeading='Patients'
          filterOptions={filterOptions}
          filterValues={[unit, status]}
          filterOnChange={handleChange}
          filterSubmit={handleRefresh}
          filterReset={handleReset}
          limit
          limitValue={limit}
          limitOnChange={handleLimitChange}
          paginatePage={page}
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
