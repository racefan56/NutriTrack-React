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

const PatientOrderResults = () => {
  const dispatch = useDispatch();

  const { patientOrders, loading, isError, message } = useSelector(
    (state) => state.patient
  );

  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [formData, setFormData] = useState({
    day: getDayOfWeek(),
    meal: 'Breakfast',
    option: '',
  });

  const { day, meal, option } = formData;

  // Run only once
  useEffect(() => {
    dispatch(getPatientOrders(`limit=${limit}&day=${day}&mealPeriod=${meal}`));
    if (isError) {
      toast.error(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset filter options to defaults. Resend dispatch
  const handleReset = () => {
    if (day !== getDayOfWeek() || meal !== 'Breakfast' || option !== '') {
      setFormData({
        day: getDayOfWeek(),
        meal: 'Breakfast',
        option: '',
      });
      dispatch(
        getPatientOrders(`limit=${limit}&day=${day}&mealPeriod=${meal}`)
      );
    }
  };

  // Build filter string
  const handleFilterString = () => {
    let string = '';

    if (day !== '') {
      string = `${string + `&day=${day}`}`;
    }
    if (meal !== '') {
      string = `${string + `&mealPeriod=${meal}`}`;
    }
    if (option !== '') {
      string = `${string + `&option=${option}`}`;
    }

    return string;
  };

  const handleChange = (e) => {
    const key = e.target.id;
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
      { value: 'Breakfast', label: 'Breakfast' },
      { value: 'Lunch', label: 'Lunch' },
      { value: 'Dinner', label: 'Dinner' },
    ],
    option: [
      { value: '', label: 'All' },
      { value: 'hot', label: 'Hot' },
      { value: 'cold', label: 'Cold' },
      { value: 'Custom', label: 'Custom' },
    ],
  };

  if (loading || !patientOrders) {
    return <Spinner />;
  }

  if (!loading && isError) {
    return <Error></Error>;
  }

  if (!loading && patientOrders) {
    return (
      <>
        <Table
          headers={['Unit', 'Room', 'First', 'Last', 'Status', '']}
          heading='Patient Orders'
          refresh
          refreshDispatch={getPatientOrders}
          filterHeading='Patient Orders'
          filterOptions={filterOptions}
          filterValues={[day, meal, option]}
          filterOnChange={handleChange}
          filterReset={handleReset}
          filterString={handleFilterString}
          limit
          limitValue={limit}
          limitSetLimit={setLimit}
          paginate
          paginateCurPage={curPage}
          paginateSetPage={setCurPage}
        >
          {patientOrders.map((order) => (
            <React.Fragment key={order._id}>
              <TableDataItem
                navigatePath={`/patients/${order.patientID._id}/orders/${order._id}`}
                dataPoints={[
                  order.patientID.roomNumber.unit.unitName,
                  order.patientID.roomNumber.roomNumber,
                  order.patientID.firstName,
                  order.patientID.lastName,
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
