import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    dispatch(getPatientOrders());
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  const handleRefresh = () => {
    dispatch(getPatientOrders());
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
          refresh={handleRefresh}
          createPath='create'
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
