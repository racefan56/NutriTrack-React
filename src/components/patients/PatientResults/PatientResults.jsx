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

  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('+lastName');
  const [formData, setFormData] = useState({
    unit: '',
    status: '',
  });
  const [unitValuesLabels, setUnitValuesLabels] = useState([]);

  const { unit, status } = formData;

  useEffect(() => {
    dispatch(getUnits());
    dispatch(getPatients(`limit=${limit}&sort=${sort}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (formData.unit !== '' || formData.status !== '') {
      setFormData({
        unit: '',
        status: '',
      });
      dispatch(getPatients(`limit=${limit}&sort=${sort}`));
    }
  };

  const handleFilterString = () => {
    let string = '';

    if (unit !== '') {
      string = `${string + `&unit=${unit}`}`;
    }
    if (status !== '') {
      string = `${string + `&status=${status}`}`;
    }
    return string;
  };

  const handleChange = (e) => {
    const key = e.target.id;
    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const filterOptions = {
    unit: unitValuesLabels,
    status: [
      { value: '', label: 'All' },
      { value: 'NPO', label: 'NPO' },
      { value: 'Eating', label: 'Eating' },
    ],
  };

  const sortOptions = [
    { value: '+lastName', label: 'Last name A-Z' },
    { value: '-lastName', label: 'Last name Z-A' },
    { value: '+status', label: 'Status A-Z' },
    { value: '-status', label: 'Status Z-A' },
  ];

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
          refresh
          refreshDispatch={getPatients}
          createPath='create'
          filterHeading='Patients'
          filterOptions={filterOptions}
          filterValues={[unit, status]}
          filterOnChange={handleChange}
          filterReset={handleReset}
          filterString={handleFilterString}
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
          sort
          sortInitialVal='+lastName'
          sortValue={sort}
          sortSetSort={setSort}
          sortOptions={sortOptions}
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
