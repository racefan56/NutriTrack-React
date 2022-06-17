import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getDayOfWeek } from '../helperFunctions/helperFunctions';

import { getPatientOrders } from '../../features/patient/patientSlice';
import Table from '../layout/Table/Table';
import TableDataItem from '../layout/Table/TableDataItem/TableDataItem';
import Spinner from '../Spinner/Spinner';
import ButtonMain from '../layout/Button/ButtonMain/ButtonMain';
import Error from '../Error/Error';

const PatientOrderResults = (props) => {
  const dispatch = useDispatch();

  const { patientOrders, loading, isError, message } = useSelector(
    (state) => state.patient
  );

  const [formData, setFormData] = useState({
    day: getDayOfWeek(),
    meal: '',
  });

  const { day, meal } = formData;

  useEffect(() => {
    dispatch(getPatientOrders(`day=${day}`));
    if (isError) {
      toast.error(message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterAndRefresh = () => {
    let string = '';
    if (day !== '') {
      string = `day=${day}`;
    }
    if (meal) {
      if (string !== '') {
        string = `${string + `&mealPeriod=${meal}`}`;
      } else {
        string = `${string + `mealPeriod=${meal}`}`;
      }
    }
    return dispatch(getPatientOrders(string));
  };

  const handleChange = (e) => {
    const key = e.target.id;

    //remove inline style added to invalid inputs on submit attempts when edited
    if (e.target.style) {
      e.target.removeAttribute('style');
    }

    if (e.target.type === 'checkbox') {
      const checked = Array.from(
        document.querySelectorAll(`input[type=checkbox][name=${key}]:checked`),
        (e) => e.value
      );
      return setFormData((prevState) => ({
        ...prevState,
        [key]: [...checked],
      }));
    }

    setFormData((prevState) => ({ ...prevState, [key]: e.target.value }));
  };

  const filterOptions = {
    day: [
      { value: 'Sunday', label: 'Sunday' },
      { value: 'Monday', label: 'Monday' },
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Thursday', label: 'Thursday' },
      { value: 'Friday', label: 'Friday' },
      { value: 'Saturday', label: 'Saturday' },
    ],
    meal: [
      { value: '', label: 'All' },
      { value: 'Breakfast', label: 'Breakfast' },
      { value: 'Lunch', label: 'Lunch' },
      { value: 'Dinner', label: 'Dinner' },
    ],
  };

  if (loading || !patientOrders) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  } else {
    return (
      <>
        <Table
          headers={['Day', 'Meal', 'Unit', 'Room', 'Status', '']}
          heading='Patient Orders'
          refresh={handleFilterAndRefresh}
          createPath='create'
          filterHeading='Patient Orders'
          filterOptions={filterOptions}
          filterValues={[day, meal]}
          filterOnChange={handleChange}
          filterSubmit={handleFilterAndRefresh}
        >
          {patientOrders.map((order, index) => (
            <React.Fragment key={order._id}>
              <TableDataItem
                navigatePath={`/control-panel/patient-orders/${order._id}`}
                dataPoints={[
                  order.day,
                  order.mealPeriod,
                  order.patientID.roomNumber.unit.unitName,
                  order.patientID.roomNumber.roomNumber,
                  order.patientID.status,
                ]}
              >
                <td>
                  <ButtonMain
                    className='m-0'
                    type='Link'
                    path={`${order._id}`}
                    text='View/Edit'
                  />
                </td>
              </TableDataItem>
            </React.Fragment>
          ))}
        </Table>
      </>
    );
  }
};

export default PatientOrderResults;
